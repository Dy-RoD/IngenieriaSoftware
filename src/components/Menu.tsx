import React, { useState } from 'react';
import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonMenu, 
  IonModal, 
  IonTitle, 
  IonToolbar, 
  IonInput 
} from '@ionic/react';
import './Menu.css';

function Menu() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'personalInfo' | 'security'>('personalInfo');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('constraseña');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    profilePicture: '../assets/user.png',
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleLogout = () => {
    localStorage.removeItem('usuario')
    window.location.href = "/Login";
  };

  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  
  // Array de usuarios predefinidos
  const [users, setUsers] = useState([
    { id: 1, name: 'María González', role: 'Gerente' },
    { id: 2, name: 'Luis Pérez', role: 'Analista' },
    { id: 3, name: 'Ana Rodríguez', role: 'Desarrolladora' },
    { id: 4, name: 'Juan Martínez', role: 'Scrum Master' },
  ]);

  const [crudAction, setCrudAction] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUserData, setNewUserData] = useState({ name: '', role: '' });

  // Abrir modal según la acción
  const handleCrudAction = (action: 'add' | 'edit' | 'view', user?: any) => {
    setCrudAction(action);
    setSelectedUser(user || null);
    if (action === 'add') {
      setNewUserData({ name: '', role: '' });
    }
  };

  // Guardar nuevo usuario
  const handleSaveNewUser = () => {
    if (newUserData.name && newUserData.role) {
      setUsers([...users, { id: Date.now(), ...newUserData }]);
      setCrudAction(null);
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  // Actualizar usuario
  const handleUpdateUser = () => {
    setUsers(
      users.map(user =>
        user.id === selectedUser.id ? { ...user, ...newUserData } : user
      )
    );
    setCrudAction(null);
  };

  // Eliminar usuario
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleUpdateProfile = () => {
    setProfileData(editData);
    setIsEditModalOpen(false);
    console.log("Perfil actualizado:", profileData);
  };

  const handleUpdatePassword = () => {
    setIsUpdatePasswordModalOpen(true);
  };

  // Confirmar y guardar la nueva contraseña
  const handleSaveNewPassword = () => {
    if (newPassword === confirmNewPassword) {
      setPassword(newPassword);  // Actualizamos la contraseña
      setIsUpdatePasswordModalOpen(false);  // Cerramos el modal
      alert('Contraseña actualizada exitosamente!');
    } else {
      alert('Las contraseñas no coinciden.');
    }
  };
  const handleDeleteAccount = () => {
    if (confirmPassword === password) { // Aquí compara con la contraseña actual real
      alert('Redirigiendo a Inicio de Sesión');
      window.location.href = '/Login'; // Redirige a /home si la verificación es exitosa
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <>
      <IonMenu side="start" contentId="main-content">
        <IonHeader>
          <IonToolbar className='searchPA'>
            <IonTitle>Gestor de Proyecto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonButton className='menuBtn' routerLink="/Home">Inicio</IonButton>
            </IonItem>
            <IonItem>
              <IonButton className='menuBtn' onClick={() => setIsProfileModalOpen(true)}>Mi perfil</IonButton>
            </IonItem>
            <IonItem>
              <IonButton className='menuBtn' routerLink='/Proyecto'>Proyectos</IonButton>
            </IonItem>
            <IonItem>
              <IonButton className='menuBtn' routerLink='/Trato'>Acuerdos</IonButton>
            </IonItem>
            <IonItem>
              <IonButton className='menuBtn' onClick={handleLogout}>Cerrar Sesión</IonButton>
            </IonItem>
            
            {localStorage.getItem('usuario') === 'admin' ? (
              <IonItem>
                <IonLabel>Vista Administrador</IonLabel>
                <IonButton className='menuBtn' onClick={() => setIsUsersModalOpen(true)}>Usuarios</IonButton>
              </IonItem>
            ):null}
          </IonList>
        </IonContent>
      </IonMenu>
     {/* Modal para la lista de usuarios */}
     <IonModal isOpen={isUsersModalOpen} onDidDismiss={() => setIsUsersModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Usuarios</IonTitle>
            <IonButton slot="end" onClick={() => setIsUsersModalOpen(false)}>Cerrar</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButton expand="block" onClick={() => handleCrudAction('add')}>
            Agregar Usuario
          </IonButton>
          <IonList>
            {users.map(user => (
              <IonItem key={user.id}>
                <IonLabel>
                  <strong>{user.name}</strong> - {user.role}
                </IonLabel>
                <IonButton size="small" onClick={() => handleCrudAction('view', user)}>
                  Ver
                </IonButton>
                <IonButton size="small" onClick={() => handleCrudAction('edit', user)}>
                  Editar
                </IonButton>
                <IonButton size="small" color="danger" onClick={() => handleDeleteUser(user.id)}>
                  Eliminar
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>

      {/* Modal para acciones CRUD */}
      <IonModal isOpen={crudAction !== null} onDidDismiss={() => setCrudAction(null)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              {crudAction === 'add' ? 'Agregar Usuario' : crudAction === 'edit' ? 'Editar Usuario' : 'Detalles del Usuario'}
            </IonTitle>
            <IonButton slot="end" onClick={() => setCrudAction(null)}>Cerrar</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {crudAction === 'view' && selectedUser ? (
            <>
              <IonItem>
                <IonLabel>Nombre: {selectedUser.name}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Cargo: {selectedUser.role}</IonLabel>
              </IonItem>
            </>
          ) : (
            <>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  value={newUserData.name}
                  onIonChange={e => setNewUserData({ ...newUserData, name: e.detail.value! })}
                  disabled={crudAction === 'view'}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Cargo</IonLabel>
                <IonInput
                  value={newUserData.role}
                  onIonChange={e => setNewUserData({ ...newUserData, role: e.detail.value! })}
                  disabled={crudAction === 'view'}
                />
              </IonItem>
              {crudAction === 'add' && (
                <IonButton expand="block" onClick={handleSaveNewUser}>
                  Guardar
                </IonButton>
              )}
              {crudAction === 'edit' && (
                <IonButton expand="block" onClick={handleUpdateUser}>
                  Actualizar
                </IonButton>
              )}
            </>
          )}
        </IonContent>
      </IonModal>

      {/* Modal para Mi Perfil */}
      <IonModal isOpen={isProfileModalOpen} onDidDismiss={() => setIsProfileModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Mi Perfil</IonTitle>
            <IonButton slot="end" onClick={() => setIsProfileModalOpen(false)}>Cerrar</IonButton>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '16px' }}>
            <IonButton onClick={() => setSelectedTab('personalInfo')} color={selectedTab === 'personalInfo' ? 'primary' : 'medium'}>
              Información Personal
            </IonButton>
            <IonButton onClick={() => setSelectedTab('security')} color={selectedTab === 'security' ? 'primary' : 'medium'}>
              Seguridad
            </IonButton>
          </div>

          {selectedTab === 'personalInfo' ? (
            <>
              <IonItem>
                <IonLabel style={{ margin: '5px', fontSize:'20px', color: 'grey' }}>Foto de Perfil:</IonLabel>
                <img src={profileData.profilePicture} alt="Foto de Perfil" style={{ width: '100px', borderRadius: '50%' }} />
              </IonItem>
              <IonItem>
                <IonLabel style={{ margin: '5px', fontSize:'20px', color: 'grey' }}>Nombre: <p style={{color:'black', fontSize:'20px'}}>{profileData.firstName}</p></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel style={{ margin: '5px', fontSize:'20px', color: 'grey' }}>Apellido: <p style={{color:'black', fontSize:'20px'}}>{profileData.lastName}</p></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel style={{ margin: '5px', fontSize:'20px', color: 'grey' }}>Correo Electrónico: <p style={{color:'black', fontSize:'20px'}}>{profileData.email}</p> </IonLabel>
              </IonItem>
              <IonButton expand="block" onClick={() => setIsEditModalOpen(true)}>Editar Información</IonButton>
            </>
          ) : (
            <>
              <IonItem style={{ display: 'flex', alignItems: 'center' }}>
                <IonLabel style={{ marginRight: '8px', flex: '0 0 auto' }}>Contraseña:</IonLabel>
                <IonInput
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                  readonly
                  style={{ flex: '1' }}  // Esto hace que el input ocupe el resto del espacio
                />
                <IonButton
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  size="small"
                  style={{ marginLeft: '8px' }}
                >
                  {isPasswordVisible ? 'Ocultar' : 'Mostrar'}
                </IonButton>
              </IonItem>
              <IonButton expand="block" onClick={handleUpdatePassword}>Actualizar Contraseña</IonButton>
              <IonModal isOpen={isUpdatePasswordModalOpen} onDidDismiss={() => setIsUpdatePasswordModalOpen(false)}>
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>Actualizar Contraseña</IonTitle>
                    <IonButton slot="end" onClick={() => setIsUpdatePasswordModalOpen(false)}>Cerrar</IonButton>
                  </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                  <IonItem>
                    <IonLabel position="stacked">Nueva Contraseña</IonLabel>
                    <IonInput
                      type="password"
                      value={newPassword}
                      onIonChange={(e) => setNewPassword(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Confirmar Nueva Contraseña</IonLabel>
                    <IonInput
                      type="password"
                      value={confirmNewPassword}
                      onIonChange={(e) => setConfirmNewPassword(e.detail.value!)}
                    />
                  </IonItem>

                  <IonButton expand="block" onClick={handleSaveNewPassword}>Guardar Contraseña</IonButton>
                </IonContent>
              </IonModal>
              <IonItem>
                <IonLabel position="stacked">Verificar Contraseña</IonLabel>
                <IonInput
                  type="password"
                  placeholder="Confirme su contraseña para eliminar la cuenta"
                  value={confirmPassword}
                  onIonChange={e => setConfirmPassword(e.detail.value!)}
                />
              </IonItem>
              <IonButton expand="block" color="danger" onClick={handleDeleteAccount}>Eliminar Cuenta</IonButton>
            </>
          )}
        </IonContent>
      </IonModal>

      {/* Modal para Editar Información */}
      <IonModal isOpen={isEditModalOpen} onDidDismiss={() => setIsEditModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Editar Información</IonTitle>
            <IonButton slot="end" onClick={() => setIsEditModalOpen(false)}>Cerrar</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={editData.firstName} onIonChange={e => setEditData({ ...editData, firstName: e.detail.value! })} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Apellido</IonLabel>
            <IonInput value={editData.lastName} onIonChange={e => setEditData({ ...editData, lastName: e.detail.value! })} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Correo Electrónico</IonLabel>
            <IonInput type="email" value={editData.email} onIonChange={e => setEditData({ ...editData, email: e.detail.value! })} />
          </IonItem>
          <IonButton expand="block" onClick={handleUpdateProfile}>Guardar Cambios</IonButton>
        </IonContent>
      </IonModal>
    </>
  );
}

export default Menu;



