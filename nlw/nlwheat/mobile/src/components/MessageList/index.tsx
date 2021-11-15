import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { ScrollView } from 'react-native';
import { api } from '../../services/api';
import { IMessage, Message } from '../Message';
import { styles } from './styles';

//import { MESSAGES_EXAMPLE } from '../../utils/messages';

let messagesQueue: IMessage[] = [];
const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessage] = useState<IMessage[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get<IMessage[]>('/messages/last3');
      setCurrentMessage(response.data);
    })();
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessage((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);
        messagesQueue.shift();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="never"
      >
        {currentMessages.map((message: IMessage) => (
          <Message key={message.id} data={message} />
        ))}
      </ScrollView>
    </>
  );
}
