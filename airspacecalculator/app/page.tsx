import { Map, Modal } from './component/index';
import { AppWrapper } from '@/app/context';
export default function Home() {
  return (
    <div className=" flex h-screen items-center p-7 ">
      <AppWrapper>
        <Modal />
        <Map />
      </AppWrapper>
    </div>
  );
}
