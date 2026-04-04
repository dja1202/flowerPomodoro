import spriteSheet from 'figma:asset/23a8b90835de73a5adeb27178a532ac5f49b7a5b.png';

interface FlowerSpriteProps {
  rowIndex: number;
  stageIndex: number;
  size?: number;
}

export function FlowerSprite({ rowIndex, stageIndex, size = 80 }: FlowerSpriteProps) {
  // Sprite sheet has 7 columns (stages) and 5 rows (flowers)
  const totalColumns = 7;
  const totalRows = 5;
  
  // Calculate the position based on the sprite sheet dimensions
  const backgroundPositionX = `${(stageIndex / (totalColumns - 1)) * 100}%`;
  const backgroundPositionY = `${(rowIndex / (totalRows - 1)) * 100}%`;
  
  return (
    <div
      className="flower-sprite"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${spriteSheet})`,
        backgroundSize: `${totalColumns * 100}% ${totalRows * 100}%`,
        backgroundPosition: `${backgroundPositionX} ${backgroundPositionY}`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  );
}
