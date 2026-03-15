import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Card, Form, Input, Select, Space, Table, Tabs, Typography } from 'antd';
import { api, apiAuth, DEMO_MODE, tokenStore } from '../lib/api';

const ENTITIES = ['invitados', 'categorias', 'eventos', 'registrados'] as const;
type Entity = (typeof ENTITIES)[number];

export function AdminPage() {
  if (DEMO_MODE) {
    return (
      <section className="section">
        <Typography.Title level={2}>Admin</Typography.Title>
        <Alert
          type="info"
          message="El panel admin no esta disponible en el demo de GitHub Pages."
          description="Para probar el backend y el CRUD completo hay que ejecutar el proyecto en local o desplegar la API por separado."
          showIcon
        />
      </section>
    );
  }

  const [entity, setEntity] = useState<Entity>('invitados');
  const [jsonPayload, setJsonPayload] = useState('{}');
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const [logged, setLogged] = useState(Boolean(tokenStore.access));

  const rowsQuery = useQuery({
    queryKey: ['admin-rows', entity, logged],
    queryFn: () => api<Record<string, unknown>[]>(`/admin/${entity}`),
    enabled: logged
  });

  const metricsQuery = useQuery({
    queryKey: ['admin-metrics', logged],
    queryFn: () => api<{ registros: number; pagados: number; pendientes: number; ganancias: number }>('/admin/dashboard/metrics'),
    enabled: logged
  });

  const seriesQuery = useQuery({
    queryKey: ['admin-series', logged],
    queryFn: () => api<Array<{ dia: string; total: string }>>('/admin/dashboard/registrations-series'),
    enabled: logged
  });

  const loginMutation = useMutation({
    mutationFn: (values: { usuario: string; password: string }) => apiAuth('/auth/login', values),
    onSuccess: (tokens) => {
      tokenStore.set(tokens);
      setLogged(true);
      setError('');
    },
    onError: (err) => setError(String(err))
  });

  const createMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      api(`/admin/${entity}`, {
        method: 'POST',
        body: JSON.stringify({ data: payload })
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rows'] });
      setError('');
    },
    onError: (err) => setError(String(err))
  });

  const columns = useMemo(() => {
    const row0 = rowsQuery.data?.[0] ?? {};
    return Object.keys(row0).map((key) => ({
      title: key,
      dataIndex: key,
      key
    }));
  }, [rowsQuery.data]);

  if (!logged) {
    return (
      <section className="section">
        <Typography.Title level={2}>Admin</Typography.Title>
        <Card style={{ maxWidth: 440 }}>
          <Form layout="vertical" onFinish={(v) => loginMutation.mutate(v)}>
            <Form.Item name="usuario" label="Usuario" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loginMutation.isPending}>Entrar</Button>
          </Form>
          {error && <Alert type="error" message={error} style={{ marginTop: 12 }} />}
          <Typography.Paragraph style={{ marginTop: 12 }}>
            Credenciales seed: <code>admin / admin123</code>
          </Typography.Paragraph>
        </Card>
      </section>
    );
  }

  return (
    <section className="section">
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>Panel Admin</Typography.Title>
        <Button
          onClick={() => {
            tokenStore.clear();
            setLogged(false);
          }}
        >
          Salir
        </Button>
      </Space>

      <Tabs
        items={[
          {
            key: 'dashboard',
            label: 'Dashboard',
            children: (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Card>
                  <pre>{JSON.stringify(metricsQuery.data ?? {}, null, 2)}</pre>
                </Card>
                <Card>
                  <pre>{JSON.stringify(seriesQuery.data ?? [], null, 2)}</pre>
                </Card>
              </Space>
            )
          },
          {
            key: 'crud',
            label: 'CRUD',
            children: (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Card>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Select value={entity} onChange={(v) => setEntity(v)} options={ENTITIES.map((e) => ({ value: e, label: e }))} />
                    <Input.TextArea rows={5} value={jsonPayload} onChange={(e) => setJsonPayload(e.target.value)} />
                    <Button
                      type="primary"
                      onClick={() => {
                        try {
                          createMutation.mutate(JSON.parse(jsonPayload));
                        } catch {
                          setError('JSON inválido');
                        }
                      }}
                    >
                      Crear registro
                    </Button>
                  </Space>
                </Card>
                {error && <Alert type="error" message={error} />}
                <Card>
                  <Table
                    rowKey={(r) => String((r.id_registrado ?? r.id_categoria ?? r.invitado_id ?? r.evento_id ?? Math.random()) as string)}
                    columns={columns}
                    dataSource={rowsQuery.data ?? []}
                    loading={rowsQuery.isLoading}
                    pagination={{ pageSize: 8 }}
                    scroll={{ x: true }}
                  />
                </Card>
              </Space>
            )
          }
        ]}
      />
    </section>
  );
}
