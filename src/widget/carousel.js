import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomCard from "./carSlides";
import styles from "./css/widget.module.scss";
import Proptypes, {bool, number, string} from 'prop-types';

/**
 * Builds carousel which contains CustomCard items
 */
class Carousels extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  /**
   * Renders individual CustomCard items
   * @return {*[]}
   */
  renderItems() {
    let cards = [];
    for (let i = 0; i <= this.props.count; i++) {
      cards.push(
        <CustomCard
          key={i}
          title={this.props.title[i]}
          description={this.props.description[i]}
          src={this.props.src[i]}
          loading={this.props.loading}
        />
      );
    }
    return cards;
  }

  /**
   * Checks if value of count is the same
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.count !== prevProps.count) {
      this.carouselRef.setState({
        currentSlide: 0,
        transform: 0,
        totalItems: this.props.count
      });
    }
  }

  /**
   * Check if value of count is the same and if it's different updates card rendering
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.count !== nextProps.count) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <Carousel
        ref={(node) => (this.carouselRef = node)}
        additionalTransfrom={0}
        arrows
        centerMode={false}
        containerClass={styles.carouselContainer}
        draggable
        focusOnSelect={false}
        keyBoardControl
        minimumTouchDrag={80}
        responsive={{
          superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
          },
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
          }
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {this.renderItems()}
      </Carousel>
    );
  }
}

Carousels.protoTypes = {
  count: Proptypes.arrayOf(number),
  title:Proptypes.arrayOf(string),
  description:Proptypes.arrayOf(string),
  loading: Proptypes.bool,
  src:Proptypes.arrayOf(string),

}
export default Carousels;
