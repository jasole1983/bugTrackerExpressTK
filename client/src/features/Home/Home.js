import React from 'react'
import './Home.css'

export default function Home() {
  const motd = "Here is the Message of the Day: Thanks for coming to check out my demo!  Feel free to poke around and try it out for yourself!"
  const footer = "Sincerely, jason.leatiota@gmail.com"
  const getTime = Date().toLocaleString().slice(0,25)
  
    return (
        <div className="page-container home">
          <div className="motd-card" id="motd">
            <div className="motd-card hdr">
              {getTime}
            </div>    
            <div className="motd-card body">
              {motd}
            </div>
            <div className="motd-card ftr">
              {footer}
            </div>
          </div>  
        </div>
    )
}
