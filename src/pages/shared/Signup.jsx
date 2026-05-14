import { Button, Card, Form, Input, Select, DatePicker, App } from "antd";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../api/auth";
import signupImage from "../../assets/signup.png";

const regions = ["Tunis", "Monastir", "Sousse", "Gafsa", "Medenine"];

function Signup() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const selectedRole = Form.useWatch("role", form);
  const isAssociation = selectedRole === "ASSOCIATION";
  const isFemme = selectedRole === "FEMME MALADE";
  const isBenevole = selectedRole === "BENEVOLE";

  const disableTodayAndFuture = (current) => {
    return current && current >= dayjs().startOf("day");
  };

  async function onFinish(values) {
    try {
      const payload = {
        email: values.email,
        telephone: values.telephone,
        password: values.password,
        confirmPassword: values.confirmPassword,
        region: values.region,
        role: values.role,
      };

      if (isAssociation) {
        payload.nomOrganisation = values.nomOrganisation;
        payload.firstName = values.nomOrganisation;
        // omit lastName entirely so Zod's .optional() accepts it
        if (values.adresse) payload.adresse = values.adresse;
      } else {
        payload.firstName = values.firstName;
        payload.lastName = values.lastName;
        if (values.dob) payload.dob = values.dob.format("YYYY-MM-DD");
      }

      if (isFemme) {
        if (values.dateDiagnostic) payload.dateDiagnostic = values.dateDiagnostic.format("YYYY-MM-DD");
        if (values.dateDeclaration) payload.dateDeclaration = values.dateDeclaration.format("YYYY-MM-DD");
        if (values.membreDepuis) payload.membreDepuis = values.membreDepuis.format("YYYY-MM-DD");
      }

      if (isBenevole && values.competences?.length) {
        payload.competences = values.competences;
      }

      const response = await signUpUser(payload);
      message.success(response.data?.message || "Compte créé avec succès");
      form.resetFields();
      navigate("/login");
    } catch (error) {
      const data = error?.response?.data;
      const fieldErrors = data?.errors?.fieldErrors;
      const detail = fieldErrors
        ? Object.entries(fieldErrors)
            .map(([f, msgs]) => `${f}: ${msgs.join(', ')}`)
            .join(' | ')
        : null;
      console.error('[Signup] 400 details:', data);
      message.error(detail || data?.message || error?.message || "Erreur lors de l'inscription");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          gap: 20,
          width: "100%",
          maxWidth: 980,
          flexWrap: "nowrap",
        }}
      >
        <Card styles={{ body: { padding: 0 } }} style={{ flex: 1, overflow: "hidden" }}>
          <img
            src={signupImage}
            alt="Illustration d'inscription"
            style={{ width: "100%", height: "100%", minHeight: 700, objectFit: "cover" }}
          />
        </Card>

        <Card title="Créer un compte" style={{ flex: 1 }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Rôle"
              name="role"
              rules={[{ required: true, message: "Rôle requis" }]}
            >
              <Select
                placeholder="Choisir un rôle"
                options={[
                  { label: "Femme Malade", value: "FEMME MALADE" },
                  { label: "Bénévole", value: "BENEVOLE" },
                  { label: "Donateur", value: "DONTEUR" },
                  { label: "Association", value: "ASSOCIATION" },
                ]}
              />
            </Form.Item>

            {isAssociation ? (
              <>
                <Form.Item
                  label="Nom de l'association"
                  name="nomOrganisation"
                  rules={[{ required: true, message: "Nom de l'association requis" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Adresse"
                  name="adresse"
                  rules={[{ required: true, message: "Adresse requise" }]}
                >
                  <Input />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  label="Prénom"
                  name="firstName"
                  rules={[{ required: true, message: "Prénom requis" }]}
                >
                  <Input autoComplete="given-name" />
                </Form.Item>
                <Form.Item
                  label="Nom"
                  name="lastName"
                  rules={[{ required: true, message: "Nom requis" }]}
                >
                  <Input autoComplete="family-name" />
                </Form.Item>
              </>
            )}

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email requis" },
                { type: "email", message: "Email invalide" },
              ]}
            >
              <Input autoComplete="email" />
            </Form.Item>

            <Form.Item
              label="Téléphone"
              name="telephone"
              rules={[
                { required: true, message: "Téléphone requis" },
                { pattern: /^\d{8}$/, message: "8 chiffres requis" },
              ]}
            >
              <Input autoComplete="tel" maxLength={8} />
            </Form.Item>

            <Form.Item
              label="Région"
              name="region"
              rules={[{ required: true, message: "Région requise" }]}
            >
              <Select
                placeholder="Choisir une région"
                options={regions.map((r) => ({ label: r, value: r }))}
              />
            </Form.Item>

            {isFemme && (
              <>
                <Form.Item label="Date de diagnostic" name="dateDiagnostic">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" disabledDate={disableTodayAndFuture} />
                </Form.Item>
                <Form.Item label="Date de déclaration" name="dateDeclaration">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" disabledDate={disableTodayAndFuture} />
                </Form.Item>
                <Form.Item label="Membre depuis" name="membreDepuis">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" disabledDate={disableTodayAndFuture} />
                </Form.Item>
              </>
            )}

            {isBenevole && (
              <Form.Item label="Compétences" name="competences">
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Ex: Soins, Transport… (Entrée pour ajouter)"
                  tokenSeparators={[","]}
                />
              </Form.Item>
            )}

            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[
                { required: true, message: "Mot de passe requis" },
                { min: 8, message: "8 caractères minimum" },
                { max: 32, message: "32 caractères maximum" },
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
              label="Confirmer le mot de passe"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Confirmation requise" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Les mots de passe ne correspondent pas")
                    );
                  },
                }),
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              S'inscrire
            </Button>

            <div style={{ marginTop: 12 }}>
              <Link to="/login">Déjà un compte ?</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Signup;