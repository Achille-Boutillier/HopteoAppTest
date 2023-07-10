import SingleChip from "./SingleChip"

export default function SeveralChip({chipingList, onPress, isPressable, selectedList=[], singleChipStyle}) {


  return(
    <>
      {chipingList.map((item, index)=>
          <SingleChip 
            key={index} 
            onPress={onPress.bind(this, item)}
            isPressable={isPressable}
            isSelected ={selectedList.includes(item)}
            style={singleChipStyle}
          >
            {item}
          </SingleChip>
      )}
    </>
  )
}