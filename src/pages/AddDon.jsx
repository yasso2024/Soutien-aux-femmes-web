import { Button, Divider, Form, InputNumber, message, Select } from 'antd';
import { createDon } from '../api/dons';
import { useNavigate } from 'react-router-dom';

const AddDon = () => {
  const navigate = useNavigate();

  async function onFinish(values) {
    try {
      const response = await createDon(values);
      message.success(response.data.message);
      navigate('/dons');
    } catch (error) {
      message.error(error.message || 'Erreur lors de la création du don');
    }
  }

  return (
    <div>
      <h3>Nouveau don</h3>
      <Divider />

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Montant" name="montant">
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Type obligatoire' }]}
        >
          <Select
            options={[
              { value: 'FINANCIER', label: 'Financier' },
              { value: 'MATERIEL', label: 'Matériel' }
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

export default AddDon;