import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  Alignment,
  AlignmentEditing,
  ImageStyle,
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
  ImageCaption,
  ImageCaptionEditing,
  ImageEditing,
  ImageInline,
  ImageInsertUI,
  ImageResize,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  IndentEditing,
  Italic,
  Link,
  List,
  Paragraph,
  TodoList,
  ImageBlock,
  Table,
  TableToolbar,
  TableColumnResize,
} from 'ckeditor5'

import 'ckeditor5-premium-features/ckeditor5-premium-features.css'
import 'ckeditor5/ckeditor5.css'
import './ckeditorShow.css'
import './ckeditorDarkTheme.css'

export default function ShowTask({ value }: { value: string | null }) {
  return (
    <div id="showdata" className="mb-20">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        disabled={true}
        config={{
          link: {
            addTargetToExternalLinks: true,
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
          language: 'es-AR',
          initialData: value ?? '',
        }}
      />
    </div>
  )
}
