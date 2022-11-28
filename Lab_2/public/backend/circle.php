<?php

require_once "shape.php";

class Circle extends Shape
{
  private float $radius;

  public function __construct(int $quadrant, float $radius){
    parent::__construct($quadrant);
    $this->radius = $radius;
  }  

  public function isInShape(float $x, float $y): bool
  {
    return $this->isInQuadrant($x, $y) &&
            (($x ** 2 + $y ** 2) <= ($this->radius ** 2));
  }

}