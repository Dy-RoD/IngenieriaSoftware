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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonModal,
  IonInput,
  IonText,
  IonButtons,
  IonImg,
  IonMenuButton,
  IonIcon
} from '@ionic/react';
import { openOutline } from 'ionicons/icons';

type Participant = {
  id: number;
  name: string;
  role: string;
  position: string;
  agreement: string;
};

const ProjectDetail: React.FC = () => {
  const [projectDetails, setProjectDetails] = useState({
    name: 'Proyecto A',
    description: 'Descripción del proyecto A.',
    participants: [
      { id: 1, name: 'Carlos Pérez', role: 'Lead', position: 'Gerente de Proyecto', agreement: 'Acordado inicio en enero' },
      { id: 2, name: 'Ana Gómez', role: 'Cliente', position: 'Directora de Tecnología', agreement: 'Requiere cambios en la interfaz' },
      { id: 3, name: 'Luis Rodríguez', role: 'Proveedor', position: 'Desarrollador', agreement: 'Cumple con las entregas mensuales' }
    ] as Participant[]
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [formData, setFormData] = useState<Participant>({
    id: 0,
    name: '',
    role: '',
    position: '',
    agreement: ''
  });

  const openModal = (type: 'add' | 'edit' | 'delete', participant: Participant | null = null) => {
    setModalType(type);
    setSelectedParticipant(participant);
    setFormData(participant || { id: 0, name: '', role: '', position: '', agreement: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedParticipant(null);
    setFormData({ id: 0, name: '', role: '', position: '', agreement: '' });
  };

  const handleAdd = () => {
    const newParticipant = {
      ...formData,
      id: projectDetails.participants.length + 1,
    };
    setProjectDetails({
      ...projectDetails,
      participants: [...projectDetails.participants, newParticipant],
    });
    closeModal();
  };

  const handleEdit = () => {
    const updatedParticipants = projectDetails.participants.map(p =>
      p.id === selectedParticipant?.id ? { ...formData, id: p.id } : p
    );
    setProjectDetails({
      ...projectDetails,
      participants: updatedParticipants,
    });
    closeModal();
  };

  const handleDelete = () => {
    const updatedParticipants = projectDetails.participants.filter(p => p.id !== selectedParticipant?.id);
    setProjectDetails({
      ...projectDetails,
      participants: updatedParticipants,
    });
    closeModal();
  };

  const handleSave = () => {
    if (modalType === 'add') handleAdd();
    else if (modalType === 'edit') handleEdit();
    else if (modalType === 'delete') handleDelete();
  };

  const handleBack = () => {
    history.back();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles de {projectDetails.name}</IonTitle>
          <IonButtons slot='start'><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{projectDetails.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Descripción:</strong> {projectDetails.description}</p>
          </IonCardContent>
        </IonCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' }}>
          <h2>Participantes</h2>
          {localStorage.getItem('usuario') === 'admin' || localStorage.getItem('usuario') === 'colaborador'? (
          <IonButton color="success" onClick={() => openModal('add')} >
            <p style={{color: 'white'}}>Agregar Participante</p>
          </IonButton>
          ) : null}
        </div>

        <IonList>
          {projectDetails.participants.map((participant) => (
            <IonItem key={participant.id}>
              <IonAvatar slot="start">
                <img src={`https://www.gravatar.com/avatar/${participant.id}`} alt={participant.name} />
              </IonAvatar>
              <IonLabel>
                <h2>{participant.name}</h2>
                <p><strong>Rol:</strong> {participant.role}</p>
                <p><strong>Puesto:</strong> {participant.position}</p>
                <p><strong>Acuerdo:</strong> {participant.agreement} <IonButton routerLink='/Trato' className='menuBtn'><IonIcon icon={openOutline} slot="start" /></IonButton></p>
              </IonLabel>
              {localStorage.getItem('usuario') === 'admin' || localStorage.getItem('usuario') === 'colaborador'? (
                <IonItem>
                  <IonButton onClick={() => openModal('edit', participant)}>Editar</IonButton>
                  <IonButton color="danger" onClick={() => openModal('delete', participant)}>Eliminar</IonButton>
                </IonItem>
              ): null}
              
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block" onClick={handleBack}>
          Volver a la lista de proyectos
        </IonButton>
        {/* Modal para CRUD */}
        <IonModal isOpen={modalOpen} onDidDismiss={closeModal}>
          <IonContent className="ion-padding">
            <h2>
              {modalType === 'add' ? 'Agregar Participante' : 
              modalType === 'edit' ? 'Editar Participante' : 
              'Eliminar Participante'}
            </h2>

            {modalType !== 'delete' ? (
              <>
                <IonItem>
                  <IonLabel position="floating">Nombre</IonLabel>
                  <IonInput
                    value={formData.name}
                    onIonChange={e => setFormData({ ...formData, name: e.detail.value || '' })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Rol</IonLabel>
                  <IonInput
                    value={formData.role}
                    onIonChange={e => setFormData({ ...formData, role: e.detail.value || '' })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Puesto</IonLabel>
                  <IonInput
                    value={formData.position}
                    onIonChange={e => setFormData({ ...formData, position: e.detail.value || '' })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Acuerdo</IonLabel>
                  <IonInput
                    value={formData.agreement}
                    onIonChange={e => setFormData({ ...formData, agreement: e.detail.value || '' })}
                  />
                </IonItem>
              </>
            ) : (
              <IonText color="danger">
                <p>¿Estás seguro de que deseas eliminar a {selectedParticipant?.name}?</p>
              </IonText>
            )}

            <IonButton expand="block" onClick={handleSave} color={modalType === 'delete' ? 'danger' : 'primary'}>
              {modalType === 'add' ? 'Agregar' : modalType === 'edit' ? 'Guardar Cambios' : 'Eliminar'}
            </IonButton>
            <IonButton expand="block" color="light" onClick={closeModal}>Cancelar</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ProjectDetail;



