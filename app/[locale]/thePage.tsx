"use client";

import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
// import { Text } from "@/types/text";
import AddText from "@/components/AddText";
// import AddTextArea from "@/components/AddTextArea";
import axios from "axios";
// import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import Link from "next/link";
import AddListDialog from "@/components/AddListDialog";

import { Badge } from "@/components/ui/badge"
import ListEditDelete from "@/components/ListEditDelete";
import { useSearchParams } from "next/navigation";
import { Session } from "@/types/user";


const ThePage = ({ 
  // user
  session
 }: //   textAreaData,
//   textsDataArray,
{
  // user: Session,
  session: Session
  //   textAreaData: Text[];
  //   textsDataArray: Text[];
}) => {
  const [textsData, setTextsData] = useState([]);
  const [textsAreaData, setTextsAreaData] = useState([]);

  const [pageListId, setPageListId] = useState(localStorage.getItem('pageListId') ||'All');

  const [lists, setLists] = useState([]);

    const [sessionUser, setSessionUser] = useState<Session | null | undefined>(null);


  const locale = useLocale();

  const searchParams = useSearchParams();
  // const router = useRouter();

  const pageListIdQuery = searchParams?.get('pageListId');

  // const params = new URLSearchParams(searchParams);

  

  const getTexts = async () => {
    const res = await axios.get(`/api/get-texts?pageListId=${pageListId}`);

    setTextsData(res.data.data);
  };

  const getTextsArea = async () => {
    const res = await axios.get(`/api/get-texts-area?pageListId=${pageListId}`);

    setTextsAreaData(res.data.data);
  };

  const getLists = async () => {

    const res = await axios.get("/api/get-lists");

    setLists(res.data.data);

  }



  useEffect(() => {
    getTexts();
    getTextsArea();

    getLists();
  }, [pageListId]);


  const getSessionUser = async () => {
    
    const res = await axios.get(`/api/get-session-user?email=${session?.user?.email}&locale=${locale}`, {
      params: {
        session: JSON.stringify(session),
      }
    });

    // setRes(res)

    setSessionUser(res.data.data);

  }


  useEffect(() => {
      getSessionUser();
    }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6  mx-auto
    xl:max-w-7xl lg:max-w-[92.5vw] md:max-w-[80vw] sm:max-w-[90vw] md:mb-10 md:mt-16 my-[22px]"
    // h-full md:h-[calc(100vh-100px)]
    >
      
      { locale === "ar" && (
        <Link href={`/en`}
      className="text-left w-full"
      >
    Go to normal page (EN)
    </Link>
      )}

      <h1 className="sm:text-4xl text-3xl font-semibold my-4">Copy to Clipboard</h1>

      {sessionUser?.user?.email && (
        <div className="w-full flex flex-row justify-center gap-3 items-center
      px-[10px] sm:px-0">
        <span className="">
          {sessionUser?.user?.email}
        </span>

        <Button 
        className="bg-red-500 text-white hover:bg-red-500/95 active:scale-95
        cursor-pointer"
        onClick={() => signOut({callbackUrl: `/${locale}/`})}
        >
          Log Out
        </Button>
      </div>
      )}


      <div className="flex flex-row items-center justify-start gap-3 w-full
      overflow-x-hidden hover:overflow-x-auto max-sm:overflow-x-auto sm:px-0 px-4">

        <Badge variant="secondary"
          className={`badge-list ${pageListId === 'All' ? "selected-badge-list" : "unselected-badge-list"}`}
          onClick={() => {
            localStorage.setItem('pageListId', 'All')
            setPageListId('All');
            // params.set('pageListId', 'All')
            // router.push(`?${params.toString()}`)
            // getTexts();
            // getTextsArea();
          }}
          >
            <span className="">All</span>

            {/* <ListEditDelete name={'All'} listId={'All'} getLists={getLists}
            // email={user?.email} userId={user?.id}
            /> */}

          </Badge>

        {lists.map((list: any) => (
          // <div key={list.name} className="bg-">{list.name}</div>
          <Badge key={list.name} variant="secondary"
          className={`badge-list ${pageListId === list.id ? "selected-badge-list" : "unselected-badge-list"}`}
          onClick={() => {
            localStorage.setItem('pageListId', list.id)
            setPageListId(list.id)
            // params.set('pageListId', list.id)
            // router.push(`?${params.toString()}`)
            // getTexts();
            // getTextsArea();
          }}
          >
            <span className="">{list.name}</span>

            <ListEditDelete name={list.name} listId={list.id}  getLists={getLists} 
            // email={user?.email} userId={user?.id}
            setPageListId={setPageListId} pageListIdQuery={pageListIdQuery}
            />

          </Badge>
        ))}

        <AddListDialog email={sessionUser?.user?.email} userId={sessionUser?.user?.id} getLists={getLists} />
      </div>

      {/* {pageListIdQuery} */}

      <div className="flex xl:flex-row flex-col px-4 md:px-0
       items-start justify-center gap-10 w-full">
        <AddText textsDataArray={textsData} getTexts={getTexts} getTextsArea={getTextsArea} email={sessionUser?.user?.email}
        pageListId={pageListId} userId={sessionUser?.user?.id}
        />

        <AddText textsDataArray={textsAreaData} textAreaData={textsAreaData} getTexts={getTexts} getTextsArea={getTextsArea}
        email={sessionUser?.user?.email}  userId={sessionUser?.user?.id}
        pageListId={pageListId}
        />
        {/* <AddTextArea textAreaData={textAreaData} /> */}
      </div>
    </div>
  );
};

export default ThePage;
