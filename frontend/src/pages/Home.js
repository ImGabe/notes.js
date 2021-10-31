import React from 'react'
import PropTypes from 'prop-types'

const Home = ({ user }) => {
  // useEffect(() => {
  //   (
  //     async () => {
  //       const response = await fetch('http://localhost:3030/notes', {
  //         headers: { 'Content-Type': 'application/json' },
  //         credentials: 'include'
  //       })

  //       const content = await response.json()

  //       console.log(content)
  //     }
  //   )()
  // })

  return (
    <div>
      <h1>Home</h1>

      <div>
            {user ? 'Hi ' + user : 'You are not logged in'}
        </div>
    </div>
  )
}

Home.propTypes = {
  user: PropTypes.string.isRequired
}

export default Home
