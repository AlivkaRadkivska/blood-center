'use client';
import { useEffect, useRef, useState } from 'react';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
};

interface CkEditorProps {
  data: string | undefined;
  onChange: (data: string) => void;
}

export function CkEditor({ data, onChange }: CkEditorProps) {
  const editorRef: any = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={data ? data : ''}
      onChange={(_e: any, editor: { getData: () => string }) => {
        onChange(editor.getData());
      }}
    />
  ) : (
    <div>Редактор тексту завантажується...</div>
  );
}
