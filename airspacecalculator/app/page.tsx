import { Map, Modal } from './component/index';

export default function Home() {
  return (
    <div className=" flex h-screen items-center p-7 ">
      <Modal />
      <Map coordinates={[40, -71.4]} />
    </div>
  );
}
