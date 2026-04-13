import { Divider, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';

const AffectationsList = () => {
  const [affectations, setAffectations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Remplace ceci par ton appel API réel plus tard
        setAffectations([
          {
            _id: "1",
            benevole: { firstName: "Aya", lastName: "Ben Salah" },
            action: { titre: "Accompagnement à l’hôpital" },
            dateAffectation: "2026-03-18",
            statut: "EN_ATTENTE"
          },
          {
            _id: "2",
            benevole: { firstName: "Meriem", lastName: "Trabelsi" },
            action: { titre: "Distribution de matériel" },
            dateAffectation: "2026-03-17",
            statut: "ACCEPTEE"
          }
        ]);
      } catch (error) {
        message.error(error.message || "Erreur lors du chargement");
      }
    }

    fetchData();
  }, []);

  const columns = [
    {
      title: "Bénévole",
      key: "benevole",
      render: (_, record) =>
        record.benevole
          ? `${record.benevole.firstName} ${record.benevole.lastName}`
          : "-"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => record.action?.titre || "-"
    },
    {
      title: "Date d'affectation",
      dataIndex: "dateAffectation",
      key: "dateAffectation",
      render: (value) => value ? new Date(value).toLocaleDateString() : "-"
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => {
        let color = "default";
        if (statut === "EN_ATTENTE") color = "orange";
        if (statut === "ACCEPTEE") color = "green";
        if (statut === "TERMINEE") color = "blue";

        return <Tag color={color}>{statut}</Tag>;
      }
    }
  ];

  return (
    <div>
      <h3>Liste des affectations</h3>
      <Divider />
      <Table rowKey="_id" columns={columns} dataSource={affectations} />
    </div>
  );
};

export default AffectationsList;