import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
  useParams
} from "react-router-dom";
import Recommend from "./pages/discover/recommend";
import { useStore } from "reto";
import { RouterStore } from "./store/router.store";
import Index from "./pages";
import SongListDetail from "./pages/detail/song-list";
import TopRanking from "./pages/discover/top-ranking";
import Broadcast from "./pages/discover/broadcast";
import PlayList from "./pages/discover/playlist";

function RouterContainer() {
  // 安装useLocation
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const routerStore = useStore(RouterStore);

  React.useEffect(() => {
    routerStore.updateLocation(location);
    routerStore.updateHistory(history);
    routerStore.updateParams(params);
  }, [location, history, params, routerStore]);

  const baseHref = process.env.REACT_APP_BASEHREF
  const setPath = (path)=>`${baseHref||""}${path}`
  
  return (
    <Switch>
      <Route exact path={setPath("/")}>
        <Redirect push to={setPath("/discover/recommend")}></Redirect>
      </Route>
      <Route path={setPath("/discover/recommend")} children={<Recommend />}></Route>
      <Route path={setPath("/discover/ranking")}  children={<TopRanking />}></Route>
      <Route path={setPath("/discover/broadcast")} children={<Broadcast />}></Route>
      <Route path={setPath("/discover/playlist")} children={<PlayList />}></Route>
      <Route path={setPath("/fm")} children={<Index />}></Route>
      <Route path={setPath("/detail/song-list/:id")}  children={<SongListDetail />}></Route>
    </Switch>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <RouterContainer></RouterContainer>
    </BrowserRouter>
  );
}
