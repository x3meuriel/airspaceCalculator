import { Map, Modal } from './component/index';

export default function Home() {
  return (
    <div className="container flex h-screen items-center justify-between md:p-24 p-7 ">
      <Modal />
      <Map coordinates={[40, -71.4]} />
    </div>
  );
}
