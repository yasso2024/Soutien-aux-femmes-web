import { Button, Divider, Form, Input, message, Select } from 'antd';
import { createDemande } from '../api/demandes';
import { useNavigate } from 'react-router-dom';

const AddDemande = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await createDemande(values);
      message.success(response.data.message);
      navigate('/demandes');
    } catch (error) {
      message.error(
        error.response?.data?.message || error.message || 'Erreur lors de la création'
      );
    }
  };

  return (
    <div>
      <h3>Nouvelle demande</h3>
      <Divider />

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Titre"
          name="titre"
          rules={[{ required: true, message: 'Titre obligatoire' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Description obligatoire' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Type obligatoire' }]}
        >
          <Select
            options={[
              { value: 'FINANCIERE', label: 'Financière' },
              { value: 'MATERIELLE', label: 'Matérielle' },
              { value: 'ACCOMPAGNEMENT', label: 'Accompagnement' },
              { value: 'LOGEMENT', label: 'Logement' }
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Créer
        </Button>
      </Form>
    </div>
  );
};

export default AddDemande;