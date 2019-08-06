import os


def char_filename(char_num):
    filename = "{}_frames.png".format(char_num)
    file_location = "kanji/characters/{}".format(filename)
    return file_location


def char_exists(char_num):
    return os.path.isfile(char_filename(char_num))
