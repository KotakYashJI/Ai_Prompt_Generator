"use client"
import { LoadAnswers, singlechatmessages } from '@/actions/message.action'
import AiInput from '@/components/ui/ai-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faBars, faXmark, faPencil, faTrash, faShare } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadloginuser } from '@/actions/user.action'
import { creatchat, deletechat, loadallchats } from '@/actions/chat.action'

const Page = () => {
  const questions = useSelector((state) => state.messages.questions)
  const answers = useSelector((state) => state.messages.answers)
  const loading = useSelector((state) => state.messages.loading)
  const allchats = useSelector((state) => state.chats.AllChats);

  const dispatch = useDispatch()
  const chatRef = useRef(null)
  const lastMessageRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedchatid, setselectedchatid] = useState();
  const [showmenu, setshowmenu] = useState(false);

  const handlechat = () => {
    dispatch(creatchat());
  };

  const DeleteChat = (id) => {
    dispatch(deletechat(id));
    setshowmenu(false);
  }

  const updatechats = (id) => {
    console.log(id);
    setshowmenu(false);
  }

  const handlesinglechat = (id) => {
    dispatch(singlechatmessages(id));
    setselectedchatid(id);
  }

  useEffect(() => {
    dispatch(LoadAnswers())
    dispatch(loadallchats());
    dispatch(loadloginuser())
  }, [dispatch]);

  useEffect(() => {
    if (!lastMessageRef.current || !chatRef.current) return
    lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [questions, answers])

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <aside
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 md:w-64 bg-gray-800 text-white flex flex-col shadow-lg transform transition-transform duration-300 z-30
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        <button
          onClick={handlechat}
          className="flex items-center gap-2 m-4 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-sm sm:text-base cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          <span className="sm:inline">New Chat</span>
        </button>
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {allchats?.length <= 0 ? (
            <p className="text-gray-400 text-sm">No chats yet...</p>
          ) : (
            allchats?.map((chat, index) => (
              <div key={chat._id} className="relative">
                <p
                  //onClick={() => handlesinglechat(chat._id)}
                  className="group flex justify-between items-center bg-gray-600 rounded-xl text-white text-xs sm:text-sm md:text-base px-3 py-2 w-full hover:bg-gray-500 transition-all break-words cursor-pointer"
                >
                  <span className="truncate max-w-[85%]">{chat.chat}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setshowmenu(showmenu === index ? null : index);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-lg px-1"
                  >
                    &#8943;
                  </span>
                </p>
                {showmenu === index && (
                  <div className="absolute right-2 top-10 w-40 sm:w-44 bg-gray-700 text-white rounded-lg shadow-lg z-50 animate-fadeIn">
                    <div className="flex flex-col gap-1 p-2 text-sm sm:text-base">
                      <h6
                        //onClick={() => updatechats(chat._id)}
                        className="flex gap-2 items-center px-2 py-2 rounded-lg cursor-pointer hover:bg-gray-600">
                        <FontAwesomeIcon icon={faPencil} />
                        Rename
                      </h6>
                      <h6
                        onClick={() => DeleteChat(chat._id)}
                        className="flex gap-2 items-center px-2 py-2 rounded-lg cursor-pointer hover:bg-red-200 hover:text-red-600 text-red-400">
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                      </h6>
                      <h6 className="flex gap-2 items-center px-2 py-2 rounded-lg cursor-pointer hover:bg-gray-600">
                        <FontAwesomeIcon icon={faShare} />
                        Share
                      </h6>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 z-20 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <main className="flex-1 sm:ml-64 flex flex-col h-screen relative">
        <header className="fixed top-0 sm:left-64 left-0 right-0 z-10 bg-white border-b shadow-sm px-4 py-1 flex justify-between items-center">
          <button
            onClick={() => {
              setshowmenu(false);
              setSidebarOpen(!sidebarOpen)
            }}
            className="sm:hidden text-gray-700 text-xl"
          >
            <FontAwesomeIcon icon={sidebarOpen ? faXmark : faBars} />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">AI Chat Interface</h1>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              Start a conversation with AI below
            </p>
          </div>
        </header>
        <div
          ref={chatRef}
          onClick={() => {
            setSidebarOpen(false)
            setshowmenu(false)
          }}
          className={`flex-1 px-3 sm:px-6 pt-18 pb-4 flex flex-col space-y-6
            overflow-y-auto overflow-x-hidden
            scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 
            scrollbar-thumb-rounded-full scrollbar-track-rounded-full
            `}
          style={{
            maxHeight: "calc(100vh - 160px)",
            paddingBottom: "90px",
          }}
        >
          {questions?.map((q, index) => {
            const isLastMessage = index === questions.length - 1
            return (
              <div
                key={index}
                className="flex flex-col space-y-3"
                ref={isLastMessage ? lastMessageRef : null}
              >
                <div className="flex justify-end pr-6">
                  <div className="max-w-[75%] bg-gray-200 text-gray-900 px-5 py-3 rounded-2xl shadow break-words whitespace-pre-wrap text-sm sm:text-base">
                    {q}
                  </div>
                </div>
                <div className="flex justify-start pl-6">
                  <div className="max-w-[75%] bg-blue-100 text-gray-900 px-5 py-3 mt-1 rounded-2xl shadow break-words whitespace-pre-wrap text-sm sm:text-base">
                    {answers[index] || (
                      <span className="opacity-50 animate-pulse">AI is typing...</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <footer className="fixed bottom-0 sm:left-64 left-0 right-0 bg-white border-t px-4 flex items-center shadow-md">
          <div className="w-full max-w-2xl mx-auto">
            <AiInput disabled={loading} />
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Page