import { emDash, ellipsis } from 'prosemirror-inputrules';
import { debounce } from 'lodash';
import { columnResizing, tableEditing } from 'prosemirror-tables';
import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ImageService,
  ImageToolGroupService,
  LinkService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
  BaseService,
  BaseToolGroupService,
  DisplayBlockLevelService,
  DisplayToolGroupService,
  TextBlockLevelService,
  TextToolGroupService,
  NoteService,
  NoteToolGroupService,
  TrackChangeService,
  CommentsService,
  CodeBlockService,
  CodeBlockToolGroupService,
  DisplayTextToolGroupService,
  MathService,
  FindAndReplaceService,
  EditingSuggestingService,
  TrackingAndEditingToolGroupService,
  FullScreenService,
  FullScreenToolGroupService,
  SpecialCharactersService,
  MathEquationService,
  SpecialCharactersToolGroupService,
  HighlightService,
  TextHighlightToolGroupServices,
  InlineAnnotaitonV2GroupServices,
  EditorInfoToolGroupServices,
  BottomInfoService,
  TransformService,
  TransformToolGroupService,
  TrackOptionsToolGroupService,
  TrackCommentOptionsToolGroupService,
  CustomTagInlineToolGroupService,
  CustomTagBlockToolGroupService,
  CustomTagService,
  YjsService,
  disallowPasteImagesPlugin,
  BlockDropDownToolGroupService,
  TitleToolGroupService,
  MathEquationToolGroupService,
} from 'wax-prosemirror-services';

import { EditoriaSchema } from 'wax-prosemirror-core';

import invisibles, {
  space,
  hardBreak,
  paragraph,
} from '@guardian/prosemirror-invisibles';

import CharactersList from './CharactersList';

// const updateTitle = title => {
//   console.log(title);
// };

const updateTitle = debounce(title => {
  console.log(title);
}, 100);

const saveTags = tags => {
  // console.log(tags);
};

const updateTrackStatus = status => {
  // console.log('status', status);
};

const onWarning = message => {
  alert(message);
};

export default {
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        'Base',
        'BlockDropDown',
        'TitleTool',
        {
          name: 'Annotations',
          more: [
            'Superscript',
            'Subscript',
            'SmallCaps',
            'Underline',
            'StrikeThrough',
          ],
        },
        'HighlightToolGroup',
        // 'InlineAnnotaitonV2Group',
        'TransformToolGroup',
        'CustomTagInline',
        'Notes',
        'Lists',
        'MathEquation',
        'SpecialCharacters',
        'CodeBlock',
        'Tables',
        'TrackingAndEditing',
        'FullScreen',
      ],
    },
    // {
    //   templateArea: 'leftSideBar',
    //   toolGroups: ['DisplayText'],
    // },
    {
      templateArea: 'commentTrackToolBar',
      toolGroups: ['TrackCommentOptions'],
    },
    {
      templateArea: 'BottomRightInfo',
      toolGroups: ['InfoToolGroup'],
    },
  ],

  // CommentsService: { readOnly: true },
  // OrderedListService: { subList: false },
  // BulletListService: { subList: false },
  // JoinUpService: { subList: false },
  SpecialCharactersService: CharactersList,
  // MathEquationService: {},
  SchemaService: EditoriaSchema,
  TitleService: { updateTitle },
  RulesService: [emDash, ellipsis],
  ShortCutsService: {},
  EnableTrackChangeService: { enabled: false, toggle: true, updateTrackStatus },
  AcceptTrackChangeService: {
    own: {
      accept: true,
    },
    others: {
      accept: true,
    },
  },
  RejectTrackChangeService: {
    own: {
      reject: true,
    },
    others: {
      reject: true,
    },
  },
  PmPlugins: [
    columnResizing(),
    tableEditing(),
    invisibles([hardBreak()]),
    disallowPasteImagesPlugin(() => 
      onWarning(
        'Images are not allowed. Please upload them through filemanager',
      ),
    ),
  ],
  // ImageService: { showAlt: true },
  CustomTagService: {
    tags: [
      { label: 'custom-tag-label-1', tagType: 'inline' },
      { label: 'custom-tag-label-2', tagType: 'inline' },
      { label: 'custom-tag-label-3', tagType: 'block' },
      { label: 'label 2', tagType: 'block' },
    ],
    updateTags: saveTags,
  },
  // YjsService: {
  //   // eslint-disable-next-line no-restricted-globals
  //   connectionUrl: 'ws://localhost:4000',
  //   docIdentifier: 'prosemirror-demo',
  // },

  services: [
    new TitleToolGroupService(),
    // new YjsService(),
    new BlockDropDownToolGroupService(),
    new CustomTagService(),
    new DisplayBlockLevelService(),
    new DisplayToolGroupService(),
    new TextBlockLevelService(),
    new TextToolGroupService(),
    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new TrackChangeService(),
    new CommentsService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    new NoteService(),
    new TableToolGroupService(),
    new ImageService(),
    new ImageToolGroupService(),
    new AnnotationToolGroupService(),
    new NoteToolGroupService(),
    new ListToolGroupService(),
    new CodeBlockService(),
    new CodeBlockToolGroupService(),
    new EditingSuggestingService(),
    // new DisplayTextToolGroupService(),
    new MathService(),
    new FindAndReplaceService(),
    new TrackingAndEditingToolGroupService(),
    new FullScreenService(),
    new FullScreenToolGroupService(),
    new SpecialCharactersService(),
    new SpecialCharactersToolGroupService(),
    new HighlightService(),
    new TextHighlightToolGroupServices(),
    new InlineAnnotaitonV2GroupServices(),
    new EditorInfoToolGroupServices(),
    new BottomInfoService(),
    new TransformService(),
    new TransformToolGroupService(),
    new TrackOptionsToolGroupService(),
    new TrackCommentOptionsToolGroupService(),
    new CustomTagInlineToolGroupService(),
    new CustomTagBlockToolGroupService(),
    
    new MathEquationService(), 
    new MathEquationToolGroupService(),
    
  ],
};
