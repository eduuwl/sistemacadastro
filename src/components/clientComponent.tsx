import React, { useState } from "react";
import styles from "./clientComponent.module.css";
import { Client } from "../types/client";
import { formatPhone, addNewClient, formatDate } from "../utils/clientUtils";
import { exportToExcel } from "../utils/excelUtils";
import logo from "../assets/logo.png";

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [phone, setPhone] = useState<string>("");

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const addClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const updatedClients = addNewClient(formData, clients, phone);
    setClients(updatedClients);

    form.reset();
    setPhone("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={logo}
          alt="Hello Ana Make Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Hello Ana Make</h1>
        <p className={styles.subtitle}>Sistema de Cadastro de Clientes</p>
      </div>

      <form onSubmit={addClient}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome da Cliente:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Digite o nome completo"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="birthDate">Data de Nascimento:</label>
          <input type="date" id="birthDate" name="birthDate" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Telefone/WhatsApp:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePhoneInput}
            placeholder="(99) 99999-9999"
            required
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.primaryButton}>
            Cadastrar Cliente
          </button>
          <br />
          <button type="button" onClick={() => exportToExcel(clients)} className={styles.secondaryButton}>
            Exportar Lista de Clientes
          </button>
        </div>
      </form>

      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>Clientes Cadastradas Hoje</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <td>{client.name}</td>
                <td>{formatDate(client.birthDate)}</td>
                <td>{client.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default Clients;
