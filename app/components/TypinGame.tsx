'use client';

import { useState, useEffect } from 'react';
import { Container, Card, Typography, TextField, Button, Box } from '@mui/material';

interface Command {
  command: string;
  description: string;
  options: string;
}

export default function TypingGame() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [bgColor, setBgColor] = useState('white'); // 背景色の状態
  const [wrongAnswer, setWrongAnswer] = useState(''); // 間違えた時の正解表示

  useEffect(() => {
    fetch('/commands_data.json')
      .then((res) => res.json())
      .then((data) => setCommands(data));
  }, []);

  const checkCommand = () => {
    if (input.trim() === commands[currentIndex].command) {
      setResult('正解！次へ進もう');
      setBgColor('#c8e6c9'); // 正解時の背景色（淡い緑）

      setTimeout(() => {
        setBgColor('white'); // 背景色を元に戻す
        setCurrentIndex((prev) => prev + 1);
        setWrongAnswer('');
      }, 500);
    } else {
      setResult('不正解…もう一度！');
      setWrongAnswer(`正解は「${commands[currentIndex].command}」です`);
    }
    setInput('');
  };

  if (commands.length === 0) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 3, backgroundColor: bgColor, transition: 'background-color 0.5s ease' }}>
        <Typography variant="h6" gutterBottom>
          {commands[currentIndex].description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="コマンドを入力"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') checkCommand();
            }}
          />
       
          <Button variant="contained" onClick={checkCommand} sx={{ mt: 2 }}>
            確認
          </Button>
          {result && (
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              {result}
            </Typography>
          )}
           {commands[currentIndex].options && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {commands[currentIndex].options}
          </Typography>
        )}
          {wrongAnswer && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {wrongAnswer}
            </Typography>
          )}
        </Box>
      </Card>
    </Container>
  );
}
