import React, { useState, useMemo } from 'react';
import { Select, Tag } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { Button } from '../../index';
import intl from 'react-intl-universal';
import classNames from 'classnames';
import { unescape } from '../services/dataTransform';
import { pickDarkColor } from './services';
import './style.less';

const { Option } = Select;

export const SelectTagsField = (props) => {
  const {
    placeholder,
    options,
    limitTags,
    label,
    flexDirectionColumn,
    dropdownRender,
    onSearch,
    selectedOptions,
  } = props;

  const selectedTags = useMemo(() => {
    if (!options.length) return [];
    return (
      selectedOptions &&
      selectedOptions.map((selectedOption) => ({
        ...options.find(
          (option) => option.uri === selectedOption.value || option.uri === selectedOption.uri
        ),
        state: selectedOption.state,
      }))
    );
  }, [selectedOptions, options]);

  const [addingTag, setAddingTag] = useState(false);

  const formattedTags = (tags) =>
    tags.map(({ uri, name, color }) => ({ title: name, value: uri, color }));

  const updateTagList = (nextTags) => {
    const { onChange } = props;
    onChange(formattedTags(nextTags));
    setAddingTag(false);
  };

  const handleSelect = ({ key }) => {
    const { handleAddTag } = props;
    const newTag = options.find((option) => option.uri === key);
    const newArray = [...selectedTags, newTag];
    updateTagList(newArray);
    handleAddTag(newArray, newTag);
  };

  const onTagRemove = (uri) => () => {
    const { handleRemoveTag } = props;
    const removeTag = selectedTags.filter((tag) => tag.uri === uri);
    const newArray = selectedTags.filter((tag) => tag.uri !== uri);
    updateTagList(newArray);
    handleRemoveTag(newArray, removeTag);
  };

  const onAddTagClick = () => {
    setAddingTag(true);
  };

  const canAddTag = !limitTags || selectedTags.length < limitTags;

  return (
    <div className={`select-tag-field ${flexDirectionColumn ? 'flex-direction-column' : ''}`}>
      {label && <div className="select-tag-field-label">{label}</div>}
      <div className="select-tag-field-content">
        {selectedTags &&
          selectedTags.map((selectedTag) => (
            <Tag
              onClose={onTagRemove(selectedTag.uri)}
              key={selectedTag.uri}
              closable
              color={selectedTag.color}
              style={{ border: `1px solid ${pickDarkColor(selectedTag.color)}` }}
              className={classNames('select-field-tag', {
                adding: selectedTag.state === 'ADDING',
                removing: selectedTag.state === 'REMOVING',
              })}
            >
              {unescape(selectedTag.name)}
            </Tag>
          ))}
        {canAddTag && !addingTag && (
          <Button className="add-button" type="link" size="small" onClick={onAddTagClick}>
            {intl.get('SELECT_TAGS_FIELD_ADD')}
          </Button>
        )}
        {canAddTag && addingTag && (
          <Select
            className="select-field-tag-select"
            size="small"
            placeholder={placeholder}
            onSelect={handleSelect}
            onSearch={onSearch}
            onBlur={() => setAddingTag(false)}
            notFoundContent={intl.get('NO_CONTENT')}
            optionLabelProp="label"
            optionFilterProp="label"
            autoFocus
            showAction={['focus']}
            showSearch
            labelInValue
            dropdownClassName="select-field-tags-options"
            dropdownMatchSelectWidth={false}
            dropdownRender={dropdownRender}
            dropdownStyle={{ width: '240px' }}
          >
            {options &&
              options.reduce((acc, currentOption) => {
                if (
                  selectedTags &&
                  selectedTags.map((selectedTag) => selectedTag.uri).includes(currentOption.uri)
                ) {
                  return acc;
                }
                const { uri, name, color } = currentOption;
                return [
                  ...acc,
                  <Option label={unescape(name)} value={uri} key={uri}>
                    <span
                      className="select-field-tags-option"
                      style={{
                        background: color,
                        border: `1px solid ${pickDarkColor(color)}`,
                      }}
                    >
                      {unescape(name)}
                    </span>
                  </Option>,
                ];
              }, [])}
          </Select>
        )}
      </div>
    </div>
  );
};

SelectTagsField.propTypes = forbidExtraProps({
  label: PropTypes.string,
  flexDirectionColumn: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  handleAddTag: PropTypes.func,
  handleRemoveTag: PropTypes.func,
  placeholder: PropTypes.string,
  selectedOptions: PropTypes.arrayOf(PropTypes.shape()),
  options: PropTypes.arrayOf(PropTypes.shape()),
  limitTags: PropTypes.number,
  dropdownRender: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
});

SelectTagsField.defaultProps = {
  label: null,
  placeholder: null,
  onSearch: () => {},
  handleAddTag: () => {},
  handleRemoveTag: () => {},
  options: [],
  limitTags: 0,
  flexDirectionColumn: false,
  dropdownRender: (menu) => menu,
  selectedOptions: [],
};

export default React.memo(SelectTagsField);
