import { useSelector } from 'react-redux'
import './Header.css'


const HeaderComponent = () => {
    const userState = useSelector(state => state.session.user);
    let searchBar;
    if (userState) {
        searchBar =
            <input
                className='search'
                placeholder='Search'
            ></input>

    }
    return (
        <div className='search-bar'>
            <img className='search-icon' alt='svgImg' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTY0LjUsMTQuMzMzMzNjLTI3LjYyMTQsMCAtNTAuMTY2NjcsMjIuNTQ1MjcgLTUwLjE2NjY3LDUwLjE2NjY3YzAsMjcuNjIxNCAyMi41NDUyNyw1MC4xNjY2NyA1MC4xNjY2Nyw1MC4xNjY2N2MxMi41MjczMiwwIDIzLjk3MjU2LC00LjY3MjQ5IDMyLjc4MTksLTEyLjMxNzcxbDMuMDUxNDMsMy4wNTE0M3Y5LjI2NjI4bDQzLDQzbDE0LjMzMzMzLC0xNC4zMzMzM2wtNDMsLTQzaC05LjI2NjI4bC0zLjA1MTQzLC0zLjA1MTQzYzcuNjQ1MjEsLTguODA5MzQgMTIuMzE3NzEsLTIwLjI1NDU4IDEyLjMxNzcxLC0zMi43ODE5YzAsLTI3LjYyMTQgLTIyLjU0NTI3LC01MC4xNjY2NyAtNTAuMTY2NjcsLTUwLjE2NjY3ek02NC41LDI4LjY2NjY3YzE5Ljg3NTA5LDAgMzUuODMzMzMsMTUuOTU4MjQgMzUuODMzMzMsMzUuODMzMzNjMCwxOS44NzUwOSAtMTUuOTU4MjUsMzUuODMzMzMgLTM1LjgzMzMzLDM1LjgzMzMzYy0xOS44NzUwOSwwIC0zNS44MzMzMywtMTUuOTU4MjUgLTM1LjgzMzMzLC0zNS44MzMzM2MwLC0xOS44NzUwOSAxNS45NTgyNCwtMzUuODMzMzMgMzUuODMzMzMsLTM1LjgzMzMzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+' />
            {searchBar}
        </div>
    )
}
export default HeaderComponent