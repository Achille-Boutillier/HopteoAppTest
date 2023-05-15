import { useEffect, useState } from "react";
import TerciaryButton from "../buttons/TerciaryButton";
import { Colors } from "../../constant/Colors";


export default function OnBoardButton({buttonType, onPress}) {


  const [buttonTitle, setButtonTitle] = useState("");
  const [marginRight, setMarginRight] = useState(10);
  const [isFullColor, setIsFullColor] = useState(true);

  useEffect(()=> {
    let title;
    let fullColor;
    // let margin;
    switch (buttonType) {
      case "next" :
        title = "Suivant";
        fullColor = true;
        // margin = 10;
        break;
      case "done" :
        title = "C'est parti !";
        fullColor = true;
        // margin = 10
        break;
      case "skip" :
        title = "Ignorer";
        fullColor = false;
        // margin = 10;
        break;
    }
    setButtonTitle(title);
    setIsFullColor(fullColor);
    // setMarginRight(margin);
  }, [])


  return (
    <TerciaryButton
      title={buttonTitle}
      onPress={onPress}
      color={Colors.orange500}
      isFullColor={isFullColor}
      fontSize={16}
      style={{marginRight: marginRight}}
      secondColor={Colors.grey300}
      // transparent={true}
    />
  );
}