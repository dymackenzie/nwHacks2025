import React, { useState } from 'react';
import { Button } from '@/components';
import axios from 'axios';

import { FC } from "react"
import { Screen } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { $styles } from "../theme"
import { useAppTheme } from "@/utils/useAppTheme"

export const BigRedButtonScreen: FC<TabScreenProps<"BigButton">> =
  function StatsScreen(_props) {
    const { themed } = useAppTheme()
    const [counter, setCounter] = useState(0);
    const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (true) {
      console.log("sending request to send to arduino");
      try {
        const response = await axios.post('http://localhost:5001/send', {
          msg: "press",
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Error communicating with the server');
      }
    }
  };
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Button onPress={handleSubmit}>COFFEE!</Button>
      </Screen>
    )
  }