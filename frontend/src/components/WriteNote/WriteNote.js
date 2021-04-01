import { useState } from 'react';
import { useParams } from 'react-router-dom'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../../../node_modules/draft-js/dist/Draft.css';
import './WriteNote.css'
const WriteNote = ({ note }) => {
    const { noteId } = useParams()
    let focusNote = ''
    if (note?.length) {
        focusNote = note.find(note => note.id.toString() === noteId)
    }
    const [text, setText] = useState(focusNote.body)
    console.log(focusNote)
    return (
        <div className="note-container">
            <CKEditor

                editor={ClassicEditor}
                data={text}
                onChange={(e, editor) => {
                    const data = editor.getData()
                    setText(data)
                    console.log(text)

                }}
            />


        </div>
    )
}

export default WriteNote;