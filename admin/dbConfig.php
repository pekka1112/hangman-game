<?php
    $connect = mysqli_connect("103.97.126.29", "ywnacrje_hangman", "06072003", "ywnacrje_hangman"); // dev env
//    $connect = mysqli_connect("localhost", "ywnacrje_hangman", "06072003", "ywnacrje_hangman"); // product env
    $connect->set_charset("utf8");
    mysqli_query($connect, "SET NAMES 'utf-8'");

    // class
    class WordSet {
        public $word;
        public $hint;
        public function __construct($word, $hint) {
            $this->word = $word;
            $this->hint = $hint;
        }
    }
?>