import { TextField, Button } from '@mui/material'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      {/* bg-zinc-900 */}
        <div className='flex gap-8 flex-col max-w-xl w-full justify-center min-w-80 rounded-md p-6 shadow-lg ' > 
          <h1 className='mb-0'>Войти</h1>
          <TextField id="login-input" variant='outlined' label="Введите логин" fullWidth />
          <TextField id="password-input" variant='outlined' label="Введите пароль" fullWidth />
          
          <Button variant='contained' size='large' className='self-end font-medium' >Далее</Button>
        </div>
    </main>
)}

export default Page