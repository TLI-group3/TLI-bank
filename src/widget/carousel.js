import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomCard from "./carSlides";
import "./css/widget.module.scss";

class Carousels extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }
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
  componentDidUpdate(prevProps) {
    if (this.props.count !== prevProps.count) {
      this.carouselRef.setState({
        currentSlide: 0,
        transform: 0,
        totalItems: this.props.count
      });
    }
  }
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
        containerClass="carousel-container"
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
export default Carousels;
