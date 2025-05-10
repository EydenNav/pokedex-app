import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import Pokedex from './components/Pokedex';
import { PokedexScreen } from './components/PokedexScreen';
import { PackScreen } from './components/PackScreen'; // Import the new component
import './theme/variables.css';
import { MenuPokedexProvider } from './contexts/MenuPokedexProvider';
import { PokedexMenu } from './components/Menu/PokedexMenu';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <MenuPokedexProvider>
          <Pokedex>
            <Route exact path="/home">
              <PokedexMenu />
            </Route>
            <Route exact path="/pokedex">
              <PokedexScreen />
            </Route>
            <Route exact path="/pack">
              <PackScreen />
            </Route>
            <Route exact path="/exit">
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Pokedex>
        </MenuPokedexProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;