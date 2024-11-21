import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonProgressBar,
  IonInput,
  IonIcon,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { addOutline, createOutline, trashOutline, alertCircle } from 'ionicons/icons';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Proyecto A', status: 'En Progreso', progress: 0.5 },
    { id: 2, name: 'Proyecto B', status: 'Completado', progress: 1.0 },
  ]);
  const [newProjectName, setNewProjectName] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Función para agregar un nuevo proyecto
  const addProject = () => {
    if (newProjectName.trim() !== '') {
      setProjects([
        ...projects,
        {
          id: projects.length + 1,
          name: newProjectName,
          status: 'Por Hacer',
          progress: 0.0,
        },
      ]);
      setNewProjectName('');
    }
  };

  // Función para eliminar un proyecto
  const deleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  // Función para simular el cambio de estado del proyecto
  const updateProjectStatus = (id: number, newStatus: string) => {
    setProjects(
      projects.map(project =>
        project.id === id ? { ...project, status: newStatus } : project
      )
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestor de Proyectos</IonTitle>
          <IonButtons slot='start'><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Gestión de Proyectos</h1>

        {/* Filtro de estado */}
        <IonItem>
          <IonLabel>Filtrar por estado:</IonLabel>
          <IonSelect value={statusFilter} onIonChange={e => setStatusFilter(e.detail.value)}>
            <IonSelectOption value="">Todos</IonSelectOption>
            <IonSelectOption value="Por Hacer">Por Hacer</IonSelectOption>
            <IonSelectOption value="En Progreso">En Progreso</IonSelectOption>
            <IonSelectOption value="Completado">Completado</IonSelectOption>
          </IonSelect>
        </IonItem>
        {localStorage.getItem('usuario') === 'admin' || localStorage.getItem('usuario') === 'colaborador' ? (
        <IonItem>
          <IonInput
            placeholder="Nombre del nuevo proyecto"
            value={newProjectName}
            onIonChange={e => setNewProjectName(e.detail.value ?? '')}
          />
          <IonButton onClick={addProject}>
            <IonIcon icon={addOutline} slot="start" />
            Agregar
          </IonButton>
        </IonItem>
        ): null} 
        

        {/* Lista de proyectos */}
        {projects
          .filter(project => (statusFilter ? project.status === statusFilter : true))
          .map((project) => (
            <IonCard key={project.id}>
              <IonCardHeader>
                <IonCardTitle>{project.name}</IonCardTitle>
              </IonCardHeader>
              <p>Estado: {project.status}</p>
              <IonProgressBar value={project.progress} color={project.status === 'Completado' ? 'success' : 'primary'}></IonProgressBar>
              {localStorage.getItem('usuario') === 'admin' || localStorage.getItem('usuario') === 'colaborador'? (
                <IonCardContent>
                  <IonButton
                    color="primary"
                    onClick={() => updateProjectStatus(project.id, 'En Progreso')}
                    disabled={project.status === 'En Progreso'}
                  >
                    <IonIcon icon={createOutline} slot="start" />
                    En Progreso
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => updateProjectStatus(project.id, 'Completado')}
                    disabled={project.status === 'Completado'}
                  >
                    <IonIcon icon={createOutline} slot="start" />
                    Completar
                  </IonButton>
                  <IonButton color="danger" onClick={() => deleteProject(project.id)}>
                    <IonIcon icon={trashOutline} slot="start" />
                    Eliminar
                  </IonButton>
                </IonCardContent>
              ): null}
              <IonButton color="primary" routerLink='/Proyecto'>
                <IonIcon icon={alertCircle} slot="start" />
                Info
              </IonButton>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default ProjectDashboard;
