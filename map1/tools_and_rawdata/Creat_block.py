# -*- coding: utf-8 -*-
'''
---------------------------------------
@Time    : 2018/8/18 9:04
@Author  : Andy Zang
@File    : Creat_block
@Software: PyCharm
@For     : IP project
---------------------------------------
'''
import time


def creatBlock(left, right, bottom, top, scale):
    f = open('block.json', 'w')
    # write head
    f.write(
        """
{
  "type" : "FeatureCollection",
  "crs" : {
    "type" : "name",
    "properties" : {
      "name" : "EPSG:4326"
    }
  },
  "features" : [\n
  """
    )
    id = 1
    ax = left
    ay = bottom
    while (ax < right):
        ay=bottom
        while (ay < top):
            if id != 1:
                f.write(",\n")
            else:
                f.write("\n")
            writeBlock(ax, ay, id, scale, f)
            id += 1
            ay += scale
        ax += scale

    f.write(
        """
  ]
}
        """
    )
    f.close()


def writeBlock(ax, ay, id, scale, f):
    f.write(
        """
        {
        "type" : "Feature",
        "id" : """ + str(id) + """,
        "geometry" : {
            "type" : "Polygon",
            "coordinates" : [
                [
                    [
                        """ + str(ax) + """,
              """ + str(ay) + """,
                        0
                    ],
            [
              """ + str(ax) + """,
              """ + str(ay + scale) + """,
              0
            ],
            [
              """ + str(ax + scale) + """,
              """ + str(ay + scale) + """,
              0
            ],
            [
              """ + str(ax + scale) + """,
              """ + str(ay) + """,
              0
            ],
            [
              """ + str(ax) + """,
              """ + str(ay) + """,
              0
            ]
          ]
        ]
      },
      "properties" : {
        "OBJECTID" :""" + str(id) + """
      }
    }
        """
    )


if __name__ == '__main__':
    start = time.clock()
    creatBlock(-96.8, -94.3, 28.2, 31.1, 0.1)
    end = time.clock()
    print('Running time: %s Seconds' % (end - start))
