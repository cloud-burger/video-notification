# 📬 Video Processing Notification Service

Este projeto é um serviço **serverless** escrito em **TypeScript** e baseado na **Arquitetura Hexagonal (Ports & Adapters)**. Ele é responsável por **enviar notificações por e-mail** a partir de eventos de processamento de vídeo, consumindo mensagens publicadas em uma **fila SQS**.

---

## 🚀 Funcionalidades

- Consumo de eventos de processamento de vídeo via **AWS SQS**.
- Envio de notificações por **e-mail via SMTP**.
- Armazenamento do histórico de notificações no **DynamoDB**.
- Processamento assíncrono com **AWS Lambda**.

---

## ⚙️ Arquitetura

Este projeto segue o padrão **Clean Architecture**, favorecendo:

- Separação entre lógica de notificação e infraestrutura.
- Facilidade para testar casos de uso isoladamente.
- Flexibilidade para alterar adaptadores (ex: troca de provedor de e-mail).
- Reprocessamento de mensagens que falharem.

### Principais serviços utilizados

| Serviço        | Finalidade                                                         |
|----------------|---------------------------------------------------------------------|
| **SQS**        | Fila de eventos de vídeo processado (sucesso ou erro)              |
| **Lambda**     | Processamento da mensagem e envio de notificação                   |
| **SMTP**       | Envio dos e-mails de notificação                                   |
| **DynamoDB**   | Armazenamento das notificações enviadas                            |

### Fluxos

- **Trigger da Lambda:** A função `video-converter-send-notification` é acionada automaticamente por mensagens publicadas na fila **SQS**. A mensagem contém informações como o ID do vídeo, o status do processamento e o e-mail do usuário.
- **Envio de E-mail:** Com base nas informações da mensagem, a função envia um e-mail de sucesso ou falha no processamento, utilizando um servidor SMTP configurado via variáveis de ambiente.
- **Persistência da notificação:** Após o envio, um registro é salvo no **DynamoDB** com dados como tipo da notificação, data e status do envio.

---

### 📄 Licença

Projeto licenciado sob a **MIT License**.
