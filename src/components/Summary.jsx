import { MdAttachMoney } from 'react-icons/md';
export default function Summary({ income, expenses }) {
  return (
    <>
    <div className="components">
      <div className="flex flex-col justify-center items-center gap-2 p-2 ">
        <div className="icon bg-green-600">
          <MdAttachMoney
            fontSize="1.5em"
            color="white"
          />
        </div>
        <p>Current Balance</p>
        <p className='text-green-900 font-bold'> {income}</p>
      </div>
    </div>
    <div className="components">
      <div className="flex flex-col justify-center items-center gap-2 p-2 ">
        <div className="icon bg-green-600">
          <MdAttachMoney
            fontSize="1.5em"
            color="white"
          />
        </div>
        <p>Current Balance</p>
        <p className='text-green-900 font-bold'> {income}</p>
      </div>
    </div>
    </>
  );
}
