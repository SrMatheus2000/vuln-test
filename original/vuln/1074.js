function (rows, cluster_num) {
      var opts = this.options,
        rows_len = rows.length;
      if( ! rows_len) {
        return this.generateEmptyRow();
      }
      if (rows_len < opts.rows_in_block) {
        return rows;
      }
      if( ! opts.cluster_height) {
        this.calcClusterHeight(rows);
      }
      var items_start = cluster_num * opts.rows_in_cluster - opts.rows_in_block * cluster_num,
        items_start = items_start > 0 ? items_start : 0,
        items_end = items_start + opts.rows_in_cluster,
        top_margin = items_start * opts.item_height,
        bottom_margin = (rows_len - items_end) * opts.item_height,
        this_cluster_items = [];
      if(top_margin > 0) {
        opts.keep_parity && this_cluster_items.push('<' + opts.tag + ' class="clusterize-extra-row clusterize-keep-parity"></' + opts.tag + '>');
        this_cluster_items.push('<' + opts.tag + ' class="clusterize-extra-row clusterize-top-space" style="height:' + top_margin + 'px;"></' + opts.tag + '>');
      }
      for (var i = items_start; i < items_end; i++) {
        rows[i] && this_cluster_items.push(rows[i]);
      }
      bottom_margin > 0 && this_cluster_items.push('<' + opts.tag + ' class="clusterize-extra-row clusterize-bottom-space" style="height:' + bottom_margin + 'px;"></' + opts.tag + '>');
      return this_cluster_items;
    }