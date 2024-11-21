import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonModal,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonText,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';

type Agreement = {
  id: number;
  name: string;
  cycle: string;
  assignedUser: string;
  value: number;
  estimatedClosingDate: string;
  probability: number;
  projectedValue: number;
  clientLink: string;
  clientName: string; // Nombre del cliente
  clientRole: string; // Rol del cliente
  clientEmail: string; // Gmail del cliente
};

const Trato: React.FC = () => {
  const [agreements, setAgreements] = useState<Agreement[]>([
    {
      id: 1,
      name: 'Acuerdo con Empresa A',
      cycle: 'Propuesta',
      assignedUser: 'Juan Pérez',
      value: 15000,
      estimatedClosingDate: '2024-12-15',
      probability: 70,
      projectedValue: 10500,
      clientLink: '/profile/empresa-a',
      clientName: 'Empresa A',
      clientRole: 'Cliente',
      clientEmail: 'empresa.a@gmail.com',
    },
    {
      id: 2,
      name: 'Trato con Cliente B',
      cycle: 'Negociación',
      assignedUser: 'Ana Gómez',
      value: 20000,
      estimatedClosingDate: '2024-11-20',
      probability: 50,
      projectedValue: 10000,
      clientLink: '/profile/cliente-b',
      clientName: 'Cliente B',
      clientRole: 'Proveedor',
      clientEmail: 'cliente.b@gmail.com',
    },
  ]);

  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Agreement | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete'>('add');
  const [formData, setFormData] = useState<Agreement>({
    id: 0,
    name: '',
    cycle: 'Propuesta',
    assignedUser: '',
    value: 0,
    estimatedClosingDate: '',
    probability: 0,
    projectedValue: 0,
    clientLink: '',
    clientName: '',
    clientRole: '',
    clientEmail: '',
  });

  const openClientModal = (client: Agreement) => {
    setSelectedClient(client);
    setShowClientModal(true);
  };

  const closeClientModal = () => {
    setSelectedClient(null);
    setShowClientModal(false);
  };

  const openEditModal = (type: 'add' | 'edit' | 'delete', agreement?: Agreement) => {
    setModalType(type);
    if (type === 'edit' && agreement) {
      setFormData(agreement);
    } else if (type === 'add') {
      setFormData({
        id: 0,
        name: '',
        cycle: 'Propuesta',
        assignedUser: '',
        value: 0,
        estimatedClosingDate: '',
        probability: 0,
        projectedValue: 0,
        clientLink: '',
        clientName: '',
        clientRole: '',
        clientEmail: '',
      });
    }
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setFormData({
      id: 0,
      name: '',
      cycle: 'Propuesta',
      assignedUser: '',
      value: 0,
      estimatedClosingDate: '',
      probability: 0,
      projectedValue: 0,
      clientLink: '',
      clientName: '',
      clientRole: '',
      clientEmail: '',
    });
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newAgreement = { ...formData, id: agreements.length + 1 };
      setAgreements([...agreements, newAgreement]);
    } else if (modalType === 'edit') {
      setAgreements(agreements.map((a) => (a.id === formData.id ? formData : a)));
    } else if (modalType === 'delete') {
      setAgreements(agreements.filter((a) => a.id !== formData.id));
    }
    closeEditModal();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Acuerdos</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {localStorage.getItem('usuario') === 'admin' || localStorage.getItem('usuario') === 'colaborador'? (
          <IonButton color="primary" onClick={() => openEditModal('add')}>
          Agregar Acuerdo
          </IonButton>
        ): null}
        

        <IonList>
          {agreements.map((agreement) => (
            <IonItem key={agreement.id}>
              <IonLabel>
                <h3>{agreement.name}</h3>
                <p><strong>Ciclo:</strong> {agreement.cycle}</p>
                <p><strong>Encargado:</strong> {agreement.assignedUser}</p>
                <p><strong>Valor del Trato:</strong> ${agreement.value}</p>
                <p><strong>Fecha de Cierre:</strong> {agreement.estimatedClosingDate}</p>
                <p><strong>Probabilidad de Cierre:</strong> {agreement.probability}%</p>
                <p><strong>Valor Previsto:</strong> ${agreement.projectedValue}</p>
              </IonLabel>
              <IonButton fill="outline" color="primary" onClick={() => openClientModal(agreement)}>
                Ver Cliente
              </IonButton>
              {localStorage.getItem('usuario') === 'admin' || localStorage.getItem('usuario') === 'colaborador'? (
                <IonItem>
                  <IonButton color="secondary" onClick={() => openEditModal('edit', agreement)}>
                    Editar
                  </IonButton>
                  <IonButton color="danger" onClick={() => openEditModal('delete', agreement)}>
                    Eliminar
                  </IonButton>
                </IonItem>
                
              ):  null}
              
            </IonItem>
          ))}
        </IonList>

        {/* Modal para mostrar información del cliente */}
        <IonModal isOpen={showClientModal} onDidDismiss={closeClientModal}>
          <IonContent className="ion-padding">
            <h2>Información del Cliente</h2>
            {selectedClient && (
              <>
                <p><strong>Nombre:</strong> {selectedClient.clientName}</p>
                <p><strong>Rol:</strong> {selectedClient.clientRole}</p>
                <p><strong>Gmail:</strong> {selectedClient.clientEmail}</p>
              </>
            )}
            <IonButton expand="block" color="primary" onClick={closeClientModal}>
              Cerrar
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Modal para CRUD */}
        <IonModal isOpen={showEditModal} onDidDismiss={closeEditModal}>
          <IonContent className="ion-padding">
            <h2>
              {modalType === 'add' ? 'Agregar Acuerdo' : 
              modalType === 'edit' ? 'Editar Acuerdo' : 
              'Eliminar Acuerdo'}
            </h2>
            {modalType !== 'delete' ? (
              <>
                <IonItem>
                  <IonLabel position="floating">Nombre del Acuerdo</IonLabel>
                  <IonInput
                    value={formData.name}
                    onIonChange={(e) => setFormData({ ...formData, name: e.detail.value || '' })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Ciclo</IonLabel>
                  <IonSelect
                    value={formData.cycle}
                    onIonChange={(e) => setFormData({ ...formData, cycle: e.detail.value })}
                  >
                    <IonSelectOption value="Propuesta">Propuesta</IonSelectOption>
                    <IonSelectOption value="Negociación">Negociación</IonSelectOption>
                    <IonSelectOption value="Aprobado">Aprobado</IonSelectOption>
                    <IonSelectOption value="Rechazado">Rechazado</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Encargado</IonLabel>
                  <IonInput
                    value={formData.assignedUser}
                    onIonChange={(e) => setFormData({ ...formData, assignedUser: e.detail.value || '' })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Valor del Trato</IonLabel>
                  <IonInput
                    type="number"
                    value={formData.value}
                    onIonChange={(e) => setFormData({ ...formData, value: parseFloat(e.detail.value || '0') })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Fecha Estimada de Cierre</IonLabel>
                  <IonDatetime
                    value={formData.estimatedClosingDate}
                    onIonChange={(e) => {
                      const selectedDate = Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value;
                      setFormData({ ...formData, estimatedClosingDate: selectedDate || '' });
                    }}
                  />
                </IonItem>
                <IonButton expand="block" color="primary" onClick={handleSave}>
                  Guardar
                </IonButton>
              </>
            ) : (
              <>
                <p>¿Estás seguro de eliminar el acuerdo "{formData.name}"?</p>
                <IonButton expand="block" color="danger" onClick={handleSave}>
                  Eliminar
                </IonButton>
              </>
            )}
            <IonButton expand="block" onClick={closeEditModal}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Trato;
