import GlitchText from './GlitchText';

const GLITCH_WORDS = [
  'NÃO',
  'NUNCA', 
  'JAMAIS',
  'SEMPRE',
  'VOCÊ',
  'FORÇA',
  'CORAGEM',
  'VALOR',
  'CAPAZ',
  'SOZINHO',
  'JUNTOS',
  'FUTURO',
  'RECOMEÇAR',
  'VENCER',
  'RESISTÊNCIA',
  'RESILIÊNCIA',
  'BRILHO',
  'LUZ',
  'VERDADE',
  'CORAÇÃO',
  'HISTÓRIA',
  'HISTÓRIAS',
  'BATALHAS',
  'GENEROSA',
  'LONGE'
];

interface ProcessedTextProps {
  text: string;
  className?: string;
}

export default function ProcessedText({ text, className = '' }: ProcessedTextProps) {
  const processText = (inputText: string) => {
    const words = inputText.split(' ');
    
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:]/g, '').toUpperCase();
      const isGlitchWord = GLITCH_WORDS.includes(cleanWord);
      
      if (isGlitchWord) {
        return (
          <span key={index}>
            <GlitchText className={className}>
              {word}
            </GlitchText>
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      } else {
        return (
          <span key={index} className={className}>
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      }
    });
  };

  return <>{processText(text)}</>;
}
