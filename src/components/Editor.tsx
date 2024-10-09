import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import {
  Alignment,
  AlignmentEditing,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FontSizeEditing,
  Heading,
  Image,
  ImageBlock,
  ImageCaption,
  ImageCaptionEditing,
  ImageEditing,
  ImageInline,
  ImageInsertUI,
  ImageResize,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  IndentEditing,
  Italic,
  Link,
  List,
  Paragraph,
  Table,
  TableColumnResize,
  TableToolbar,
  TodoList,
} from 'ckeditor5'

import 'ckeditor5-premium-features/ckeditor5-premium-features.css'
import 'ckeditor5/ckeditor5.css'
import './ckeditorTextEditor.css'
import 'ckeditor-tailwind-reset/ckeditor-tailwind-reset.css'
import './ckeditorDarkTheme.css'

export default function CustomEditor({
  value,
  setValue,
}: {
  value: string
  setValue: (value: string) => void
}) {
  return (
    <div className="mb-32">
      <CKEditor
        data={value}
        editor={ClassicEditor}
        onChange={(_event, editor) => {
          const data = editor.getData()
          setValue(data)
          console.log(data)
        }}
        config={{
          fontFamily: {
            options: [
              'Geist, sans-serif',
              'Tahoma, Geneva, sans-serif',
              'Verdana, Geneva, sans-serif',
              'Arial, sans-serif',
            ],
            supportAllValues: false,
          },
          plugins: [
            Essentials,
            FontFamily,
            FontSize,
            FontSizeEditing,
            FontColor,
            FontBackgroundColor,
            Paragraph,
            Heading,
            List,
            Bold,
            Italic,
            BlockQuote,
            Link,
            ImageUpload,
            CodeBlock,
            ImageInsertUI,
            Code,
            Indent,
            IndentBlock,
            IndentEditing,
            TodoList,
            Base64UploadAdapter,
            Image,
            ImageResizeEditing,
            ImageResizeHandles,
            ImageToolbar,
            ImageCaption,
            ImageCaptionEditing,
            ImageEditing,
            ImageInline,
            ImageResize,
            ImageBlock,
            Alignment,
            AlignmentEditing,
            ImageStyle,
            Table,
            TableColumnResize,
            TableToolbar,
          ],
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableResizeColumn',
            ],
          },
          image: {
            toolbar: [
              'toggleImageCaption',
              'imageTextAlternative',
              'imageInline',
              'imageResize',
              'imageStyle',
              'imageStyle:alignLeft',
              'imageStyle:block',
              'imageStyle:alignRight',
              'imageStyle:alignBlockLeft',
              'imageStyle:alignBlockRight',
              'imageStyle:alignBlockCenter',
            ],
          },
          indentBlock: {
            offset: 1,
            unit: 'em',
          },
          alignment: {
            options: ['left', 'center', 'right'],
          },
          toolbar: {
            items: [
              'undo',
              'redo',
              '|',
              'heading',
              '|',
              'fontfamily',
              'fontsize',
              'fontColor',
              '|',
              'bold',
              'italic',
              '|',
              'outdent',
              'indent',
              'alignment',
              '|',
              'uploadImage',
              'insertTable',
              'link',
              '|',
              'bulletedList',
              'numberedList',
              'todoList',
              'blockQuote',
              'codeBlock',
              'code',
              'fontBackgroundColor',
            ],
          },
          menuBar: { isVisible: false },
        }}
      />
    </div>
  )
}
