import {Editor} from '@bytemd/react'
import 'bytemd/dist/index.css'
import highlight from '@bytemd/plugin-highlight'
import gfm from "@bytemd/plugin-gfm"
import {useState} from 'react'


const plugins = [
    gfm(),
    highlight()
]

export const MdEditor = () => {

    const [value, setValue] = useState('')

    return (
        <Editor
            value={value}
            plugins={plugins}
            onChange={(v) => {
                setValue(v)
            }}
        />
    )
}