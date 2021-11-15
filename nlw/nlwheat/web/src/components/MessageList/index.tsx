import styles from './styles.module.scss';

import LogoImg from '../../assets/logo.svg';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { io } from 'socket.io-client';

// interface IMessage {
//   id: string;
//   text: string;
//   created_at: string;
//   user_id: string;
//   user: {
//     id: string;
//     name: string;
//     github_id: number;
//     avatar_url: string;
//     login: string;
//   };
// }

interface IMessage {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
    login: string;
  };
}

const socket = io('http://localhost:4000');

const messageQueue: IMessage[] = [];

socket.on('new_message', (newMessage: IMessage) => {
  messageQueue.push(newMessage);
  console.log(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const [lists, setLists] = useState([0, 1, 2, 3]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messageQueue.length > 0) {
        setMessages((prevState) =>
          [messageQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );
        console.log(messageQueue[0], messages[0], messages[1]);

        messageQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get<IMessage[]>('messages/last3');
      setMessages(response.data);
    })();
  }, []);

  return (
    <>
      <div className={styles.messageListWrapper}>
        <img src={LogoImg} alt="DoWhile 2021" />
        <ul className={styles.messageList}>
          {messages.map((message) => (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.login} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
