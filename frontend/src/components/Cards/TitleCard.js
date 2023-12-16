import Subtitle from "../Typography/Subtitle"

  
  function TitleCard({title, children, topMargin, TopSideButtons, cardWidth,extra}){
      return(
          <div className={"card " +(cardWidth || "w-full ") + (extra || ' ')+  "p-6 bg-base-100 shadow-xl" + (topMargin || "mt-6")}>

            {/* Title for Card */}
              <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
                {title}

                {/* Top side button, show only if present */}
                {
                    TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
                }
              </Subtitle>
              
              <div className="divider mt-2"></div>
          
              {/** Card Body */}
              <div className={'h-auto bg-base-100' + (cardWidth || "w-full")}>
                  {children}
              </div>
          </div>
          
      )
  }
  
  
  export default TitleCard