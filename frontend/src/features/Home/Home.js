import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap'

export default function Home() {
  const motd = "Here is the Message of the Day: Thanks for coming to check out my demo!  Feel free to poke around and try it out for yourself!"
  const footer = "Sincerely, jason.leatiota@gmail.com"
  const getTime = () => {
    const currentTime = Date.now()
    return currentTime.toLocaleString('en-US')
  }
    return (
        <div>
          <Card className="motd-card" >
            <CardHeader className="motd-card-hdr">
              {getTime()}
            </CardHeader>    
            <CardBody className="motd-card-body">
              {motd}
            </CardBody>
            <CardFooter className="motd-card-ftr">
              {footer}
            </CardFooter>
          </Card>  
        </div>
    )
}
