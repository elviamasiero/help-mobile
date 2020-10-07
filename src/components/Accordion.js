import React, { useState, useRef } from "react";
import {Text, TouchableOpacity, View} from 'react-native'

/*import {Chevron} from './Chevron';*/
function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState(0);
  const [setRotate, setRotateState] = useState("accordion__icon");
  

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? 0 : setHeightState(1)
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }
  /* <Chevron className={`${setRotate}`} width={10} fill={"#777"} /> */

  return (
   <View className="accordion__section">
      <TouchableOpacity className={`accordion ${setActive}`} onPress={() => toggleAccordion()}>
        <Text className="accordion__title">{props.title}</Text>
      </TouchableOpacity>
      <View style={{
        flex: 1,  flexWrap: 'wrap', flexDirection: 'column', alignContent: 'space-between'
      }}
        ref={content} 
        className="accordion__content">
    	  <Text><Text style={{maxHeight:setHeight}} >{props.content}</Text></Text> 
      </View>
    </View>
  );
}

export default Accordion;
