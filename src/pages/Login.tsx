import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel, IonAlert, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonHeader } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();
  // DATOS DE LOS USUARIOS INVOLUCRADOS
  const predefinedAdmin = "admin";
  const predefinedCliente = "cliente";
  const predefinedcolaborador = "colaborador";
  const predefinedPassword = "12345";
  // ----------------------------------------- //
  const handleLogin = () => {
    if (usuario === predefinedAdmin || usuario === predefinedCliente || usuario === predefinedcolaborador && password === predefinedPassword) {
      localStorage.setItem('usuario', usuario);
      history.push('/Home');
    } else {
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestor de Proyectos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Iniciar Sesión</h2>

        <IonItem>
          <IonInput
            value={usuario}
            onIonChange={(e) => setUsuario(e.detail.value ?? '')}
            placeholder='Nombre de Usuario'
            required
          />
        </IonItem>
        
        <IonItem>
          <IonInput 
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value ?? '')}
            placeholder='Contraseña'
            required
          />
        </IonItem>
        
        <IonButton expand="block" onClick={handleLogin}>Ingresar</IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Error'}
          message={'Usuario o contraseña incorrectos'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
