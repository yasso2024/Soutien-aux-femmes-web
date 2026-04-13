import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { App, Table, Card, Input, Typography, Avatar } from 'antd';
import { SearchOutlined, HistoryOutlined } from '@ant-design/icons';
import { getLogs } from '../../api/logs';

const { Title, Text } = Typography;
const SLATE = '#64748B';

const LogsList = () => {
    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const { message } = App.useApp();
    
    const filtered = logs.filter((log) => {
        const q = search.toLowerCase();
        return log.action?.toLowerCase().includes(q) || format(log.createdAt, 'yyyy-MM-dd HH:mm').toLowerCase().includes(q);
    });

    const columns = [
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => format(text, 'dd/MM/yyyy HH:mm'),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            defaultSortOrder: "descend",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
        }
    ]

    useEffect(() => {
        async function fetchLogs() {
            setLoading(true);
            try {
                const response = await getLogs();
                setLogs(response.data.logs);
            } catch (error) {
                message.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [message])

    return (
        <div style={{ paddingBottom: 40 }}>
            {/* Hero */}
            <div
                style={{
                    background: "linear-gradient(135deg, #64748B 0%, #475569 100%)",
                    borderRadius: 20,
                    padding: "24px 32px",
                    marginBottom: 24,
                    boxShadow: "0 8px 32px #64748B40",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                <Avatar
                    size={56}
                    icon={<HistoryOutlined />}
                    style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)" }}
                />
                <div>
                    <Title level={4} style={{ color: "#fff", margin: 0 }}>
                        Historique des actions
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
                        {logs.length} log{logs.length !== 1 ? "s" : ""}
                    </Text>
                </div>
            </div>

            <Card
                style={{ borderRadius: 16, border: "none", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
                styles={{ body: { padding: 0 } }}
            >
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
                    <Input
                        prefix={<SearchOutlined style={{ color: "#aaa" }} />}
                        placeholder="Rechercher par action ou date…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ maxWidth: 420, borderRadius: 8 }}
                        allowClear
                    />
                </div>
                <Table
                    rowKey={(record) => record._id || record.id}
                    columns={columns}
                    dataSource={filtered}
                    loading={loading}
                    pagination={{ pageSize: 10, showSizeChanger: false }}
                    size="small"
                    style={{ padding: "0 8px" }}
                />
            </Card>
        </div>
    )
}

export default LogsList