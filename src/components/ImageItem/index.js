import {ListImage, ListItem, ListButton} from './styledComponents'

const ImageItem = props => {
  const {imageDetails, onClickUserChoice} = props
  const {imageUrl, id} = imageDetails

  const onClickListButton = () => {
    onClickUserChoice(id)
  }

  return (
    <ListItem>
      <ListButton
        type="button"
        onClick={onClickListButton}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <ListImage src={imageUrl} alt={id} />
      </ListButton>
    </ListItem>
  )
}
export default ImageItem
