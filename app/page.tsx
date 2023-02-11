import Link from 'next/link'
import JoinGame from '@/components/JoinGame'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import NewGameButton from '@/components/NewGameButton';

export default function Home() {
  // TODO: Fix button if continue or join

  const nextCookies = cookies();
  const cookie = nextCookies.get(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!);

  let hasCookie: boolean = cookie != undefined

  let playerUsername = "", playerCode = ''

  if (hasCookie) {
    let { username, code } = jwt.verify(
        cookie?.value,
        process.env.NEXT_PUBLIC_TOKEN_NAME
    );

    playerCode = code
  }

  return (
    <main className='root'>
      <header>
        <h1>Te conozco?</h1>
      </header>

      <div className='option'>
        <NewGameButton/>
      </div>
      <div className='option'>
        { hasCookie ? <Link href={`/game/${playerCode}`}><h2>Continuar juego</h2></Link> : <JoinGame/>}
      </div>
      <div className='option info'>
        <Link href={'/information'}>
          <h2>¿Cómo se juega?</h2>
        </Link>
      </div>
    </main>
  )
}
