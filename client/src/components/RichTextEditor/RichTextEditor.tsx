import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditor, ReactRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
} from 'mui-tiptap';
import Mention from '@tiptap/extension-mention';
import tippy from 'tippy.js';

import MentionList from './MentionList';
import { onSurface, surface } from '../../theme/colors';
import { Person, usePeopleByCurrentUserQuery, useTeamsByCurrentUserQuery } from '../../generated';
import formatName from '../../utils/formatName';

interface RichTextEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
  mentionOptions: string[];
}

const Wrapper = styled.div`
  margin-top: 4px;

  * {
    border: 0 !important;
    border-left: 0 !important;
  }

  .MuiTiptap-RichTextContent-root.MuiTiptap-RichTextField-content.css-E2Alw3-RichTextField-content-ref.MuiTiptap-RichTextContent-editable.MuiBox-root.css-14rfkvw-RichTextField-content-RichTextContent-root-RichTextContent-editable,
  .MuiCollapse-root.MuiCollapse-vertical.MuiTiptap-MenuBar-root.MuiTiptap-RichTextField-menuBar.MuiTiptap-MenuBar-sticky.MuiCollapse-entered.css-1v0u5aq-MuiCollapse-root-MenuBar-root-RichTextField-menuBar-MenuBar-sticky {
    background: ${surface};
  }

  .ProseMirror,
  .MuiTiptap-RichTextField-content {
    background: ${surface};
    color: ${onSurface};

    * {
      color: ${onSurface} !important;
    }
  }
`;

function RichTextEditorContainer({ initialContent = '', onChange }): ReactElement {
  const { data: teamsData, error: teamsError, loading: teamsLoading } = useTeamsByCurrentUserQuery();
  const { data: peopleData, error: peopleError, loading: peopleLoading } = usePeopleByCurrentUserQuery();

  if (teamsError || peopleError) {
    return <div>Error</div>;
  }

  if (teamsLoading || peopleLoading) {
    return <div>Loading...</div>;
  }

  const mentionOptions = [
    ...(teamsData?.teamsByCurrentUser?.map((team) => team.name) || []),
    ...(peopleData?.peopleByCurrentUser?.map((person) => formatName(person as Person)) || []),
  ];

  console.log('props', {
    mentionOptions,
    initialContent,
    onChange,
  });

  return <RichTextEditor initialContent={initialContent} onChange={onChange} mentionOptions={mentionOptions} />;
}

function RichTextEditor({ initialContent = '', onChange, mentionOptions = [] }: RichTextEditorProps): ReactElement {
  const [initialized, setInitialized] = useState<boolean>(false);

  console.log('mentionOptions', mentionOptions);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: {
          items: ({ query }) => {
            return mentionOptions.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
          },
          render: () => {
            let component;
            let popup;

            return {
              onStart: (props) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });

                if (!props.clientRect) {
                  return;
                }

                popup = tippy('body', {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                });
              },

              onUpdate(props) {
                component.updateProps(props);

                if (!props.clientRect) {
                  return;
                }

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },

              onKeyDown(props) {
                if (props.event.key === 'Escape') {
                  popup[0].hide();

                  return true;
                }

                return component.ref?.onKeyDown(props);
              },

              onExit() {
                popup[0].destroy();
                component.destroy();
              },
            };
          },
        },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (initialContent && !initialized) {
      editor?.commands.setContent(initialContent);
      setInitialized(true);
    }
  }, [initialContent, initialized, setInitialized]);

  return (
    <Wrapper>
      <RichTextEditorProvider editor={editor}>
        <RichTextField
          controls={
            <MenuControlsContainer>
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
            </MenuControlsContainer>
          }
        />
      </RichTextEditorProvider>
    </Wrapper>
  );
}

export default RichTextEditorContainer;
